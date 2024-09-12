import express from "express";
import cookies from "cookie-parser";
//db embed
import connectToDatabase from "./config/config.js";
import User from "./modal/userModel.js";
import { Chat } from "./modal/conversationModel.js";
import { Message } from "./modal/messageModel.js";
import { deactivateJWT } from "./middleware/deactivateJWT.js";

connectToDatabase();
//------------------//

import dotenv, { populate } from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { signToken } from "./utils/jwtAuth.js";
import { authenticateToken } from "./middleware/authMiddleware.js";

import findUserById from "./controllers/findUserById.js";
import findUserChat from  "./controllers/findUserChat.js";
import createChat from "./controllers/createChat.js";

const app = express();

const server = http.createServer(app);

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(cookies());
// app.use(authenticateToken);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
//scoket io code

io.on("connection", async (socket) => {

  console.log("userConnected: ", socket.id)

  //checking auth and updating socket
      // console.log("auth log,",socket?.handshake?.auth)


    if (socket?.handshake?.auth?.userID !== null) {

      // console.log("updating socket for ", socket.handshake.auth.userID)

      try { // console.log('userID from auth:', socket.handshake.auth.userID)
      let user = await User.findByIdAndUpdate(socket.handshake.auth.userID,{socketID: socket.id,},{ new: true })
  
    } catch (error) {
      console.log("connection event: ",error.message)
    }
    } //end
  
  
    socket.on("messageFromClient", async(data) => {//message from client
      try {
        let messageFromServer = {...data, sender:socket?.handshake?.auth?.userID}

        let receiverInfo = await User.findById(data.receiver).select("socketID")

        let newMessage;
        let newChat;

        if(receiverInfo){
            newMessage = await Message.create({//create message
            sender:socket?.handshake?.auth?.userID, //user/senders id
            receiver:receiverInfo._id,//fetched confirmed id
            message:data.message//message
          })

          newChat = await Chat.findOneAndUpdate(//find and update message
            {participants:{$all:[socket?.handshake?.auth?.userID , data.receiver]}},
            {$addToSet:{message:newMessage._id}},{new:true})
          
          if(newChat == null){//if empty chat then creates new
            
            newChat = await Chat.create(
              {participants:[socket?.handshake?.auth?.userID , data.id],
                message:[newMessage._id] })

            console.log("created chat", newChat)
            
             socket?.to(receiverInfo?.socketID).emit("messageFromServer", messageFromServer);//finally send
          }
          else{
              //else
              console.log("updated chat",newChat)
            socket?.to(receiverInfo.socketID).emit("messageFromServer", messageFromServer);
          }
        
        }
       
          
      } catch (error) {
        console.log(error.message)
      }
      })

    socket.on("updatedMessage", async(updatedMessage) =>{
      let receiverInfo = await User.findById(updatedMessage.receiver).select("socketID")
      socket.to(receiverInfo?.socketID).emit("updatedMessageFromServer", updatedMessage)
    })


  socket.on("disconnect", () => {
    console.log("a user disconnected:" + socket.id);
  });
});

//enviromental variables
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("server is up");
});

app.post("/sign-up", async (req, res) => {
  // Check if request body is empty
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "User data is missing or invalid" });
  }

  const { userName, email, password } = req.body;

  // Validate input fields
  if (!userName) {
    return res.status(400).json({ error: "Please input username" });
  }

  if (!email) {
    return res.status(400).json({ error: "Please input email" });
  }

  if (!password) {
    return res.status(400).json({ error: "Please input password" });
  }

  console.log(req.body);
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: true, message: "Email already exists" });
    }

    // Create new user and save to database
    const newUser = new User({ userName, email, password });
    await newUser.save(); //Call save() method
    console.log("new user added: " + newUser);

    return res
      .status(201)
      .json({ error: false, message: "User registered successfully." });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

app.post("/", async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: true, message: "Email and password are required" });
    }

    //credential check code

    // Check for existing user
    const user = await User.findOne({ email });

    // check for existing user
    if (!user) {
      return res
        .status(404)
        .json({ error: true, message: "Account does not exist" });
    }

    // Check if password matches
    if (password !== user.password) {
      return res
        .status(401)
        .json({ error: true, message: "Incorrect password" });
    }

    const token = signToken({
      _id: user._id,
      userName: user.userName,
      email: user.email,
    });
    res.cookie("token", token, {
      httpOnly: false,
      // secure:true
    });
    return res.status(200).json({
      error: false,
      message: "Login successful",
      userInfo: { _id: user._id, userName: user.userName, email: user.email },
      navigate: "home",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
});

app.post("/home", authenticateToken, async (req, res) => {
  try {
    const { _id, userName } = req.user;
    return res.status(200).json({
      error: false,
      message: "Contacts fetched successfully",
      userInfo: { _id, userName },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "internal server error /HOME" });
  }
});

app.post("/chat/:id", authenticateToken, async(req,res)=>{
 try {

  let data = await findUserById(req,res)//fcontroller

  if(data){
   const findChat =  await findUserChat(req);//controller
   console.log("findchat", findChat)

    if(!findChat){
      const newChat = await createChat(req);//controller
      console.log(newChat)
      if(newChat != null){
        return res.status(200).json({
          error: false,
          message:"success",
          talkingTo:data,
          messages:[]
        })
      }}

      return res.status(200).json({
        error: false,
        message:"success",
        talkingTo:data,
        messages:findChat.message})
      }
   


 } catch (error) {
  
 }
     
     
     
      
})
  




  



    

app.delete("/deleteConversation/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const conversation = await Chat.findOneAndDelete({
      participants: { $all: [id, _id] },
    });
    const message = await Message.deleteMany({
      $or: [
        { sender: _id, receiver: id },
        { receiver: _id, sender: id },
      ],
    });
    if (conversation == null) {
      return res
        .status(400)
        .json({ error: false, message: "conversation not found" });
    }

    return res.status(200).json({ error: false, message: "Message deleted" });
  } catch (error) {
    return console.log(error.message);
  }
});

//get AddfriendUSer
app.post("/addFriend", authenticateToken, async (req, res) => {
  try {
    const { email } = req.body;
    if (email == req.user.email) {
      //handling if user inputs personal email instead
      return res
        .status(200)
        .json({
          error: true,
          message: "cannot add yourself to the friend list",
        });
    }





    const user = await User.findOne({ email }).select("userName"); //finding the yser
    console.log(user);
    if (user == null) {
      return res.status(404).json({ error: true, message: "no user found" });
    } else {

      let chat = await Chat.findOne({participants:{$all:[user._id, req.user._id]}})

      console.log(chat)
      if(chat != null){
        return res
        .status(200)
        .json({ error: true, message: "chat already exists"});
      }

        chat = await Chat.create({
        participants: [user._id, req.user._id],
        message: [],
      })//end

      return res
        .status(200)
        .json({ error: false, message: "user found", user });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "server error on /addFriend" });
  }
});

app.get("/fetchContacts", authenticateToken, async (req, res) => {
  try {
    const { _id } = req.user;
    const findContacts = await Chat.find({ participants: _id }).select(
      "participants   -_id"
    );
    //using reduce to store everything in a single array
    let contacts = findContacts.reduce((acc, item) => {
      let data = [];
      for (const findID of item.participants) {
        if (findID != _id) {
          data.push(findID);
        }
      }
      return acc.concat(data);
    }, []);

    if (contacts) {
      contacts = await User.find({ _id: { $in: contacts } }).select(
        "-password -chatId -socketID "
      );
    }

    return res.status(200).json({
      error: false,
      message: "successfully",
      contacts: contacts,
    });


  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: true,
      message: "server error on /fetchContacts",
    });
  }
});

app.patch("/updateMessage", authenticateToken, async (req, res) => {
  try {
    const { messageID, updatedMessage } = req.body;
    console.log(messageID, updatedMessage)
    const response = await Message.findByIdAndUpdate(messageID, { message:updatedMessage },  { new: true });
    console.log("updated message", response);
    return res.status(200).json({ error: false, message: "api hit", updatedMessage:response });
  } catch (err) {}
});

app.post('/logout',deactivateJWT,(req,res)=>{
  return res.status(200).json({error:false, message:"logged out"})
})
