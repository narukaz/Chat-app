import express from "express";
import cookies from "cookie-parser";
//db embed
import connectToDatabase from "./config/config.js";
import User from "./modal/userModel.js";
import { Chat } from "./modal/conversationModel.js";
import { Message } from "./modal/messageModel.js";
import { Contacts } from "./modal/contactsModel.js";

connectToDatabase();
//------------------//

import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { signToken } from "./utils/jwtAuth.js";
import { authenticateToken } from "./middleware/authMiddleware.js";
import { error, log } from "console";
import { userInfo } from "os";
import path from "path";

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
})

//scoket io code
io.on("connection", (socket) => {
  socket.on("connectTo", (data) => {
    socket.join(data);
    console.log(data);
  });
  socket.on("send_message", (data) => {
    socket.to(data.id).emit("received_message", data);
    console.log(data.message);
  });
})

//enviromental variables

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("server is up");
})

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
})

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
})

app.post("/home", authenticateToken, async (req, res) => {
  const { _id } = req.user;

  try {

    const contactDoc = await Contacts.findOne({ userID: _id }).populate({
      path: "contacts",
      select: "userName email",
    });
  
    if (contactDoc === null) {
      return res.status(200).json({ userInfo: { ...req.user }, contacts: [] });
    }
  
    return res
      .status(200)
      .json({ userInfo: { ...req.user }, contacts: contactDoc.contacts });



  } catch (error) {}
     return console.log(err.message)
})

app.post("/chat/:id", authenticateToken, async (req, res) => {

  const { _id, userName, email } = req.user;
  let receiverID = req.params.id;

  //finding the receiver

  const talkingTo = await User.findById(receiverID).populate('userName');

  try {
    

    let data = await Chat.findOne({_id, receiverID}).populate('messages'); //checking if chat exists-1


    if(data == null){  ///creating new object if not available
      let data = await Chat.create({
        participants:[_id, receiverID],
        messages:[]
      })  

      if(data){ //returning if got created
        return res.status(200).json({error:false, message:'fetch or added - success!', messages : [] , userInfo:{...req.user}, talkingTo :talkingTo||"No such user"})
      }
    }
    else{ //returning if found
      return res.status(200).json({error:false, message:'fetch or added - success!',messages : data.message, userInfo:{...req.user},talkingTo :talkingTo||"No such user"})
    }


  } catch (error) {
    console.log(error.message)
    return res
      .status(500)
      .json({ error: true, message: "internal server error" });
  }
})

app.post("/sendMessage/:id", authenticateToken, async (req, res) => {
        
    const {_id} = req.user;
    const {message}= req.body;
    const  receiverID = req.params.id;
    console.log(receiverID);
    const talkingTo = await User.findById(receiverID).populate('userName');
  // my contact logic start
    let contactDoc = await  Contacts.findOneAndUpdate({ userID: _id },{$addToSet:{contacts:receiverID}},{new:true}).populate({path:'contacts' ,select:"userName  _id"});
    console.log("findbyandUpdate" + contactDoc);

    try {

      if(contactDoc == null){
         contactDoc = await Contacts.create({
          userID: _id,
          contacts: [receiverID]
        }) //end of creation
        console.log("creationg :" + contactDoc)
        //populating creation
        contactDoc = await contactDoc.populate('contacts');
        console.log("created:" + contactDoc)
      }//close

      let newMessage =  await Message.create({
        sender:_id,
        receiver:receiverID,
        message:message
      })

      let conversation = await Chat.findOneAndUpdate({participants:{$all:[_id,receiverID]}}, {$addToSet:{message:newMessage._id}})
      await conversation.populate('message')
      console.log(conversation);
      
      //returning final result
      return res.status(200).json({error:false,message:"success",contacts:contactDoc.contacts , userInfo:{...req.body}, talkingTo :talkingTo||"No such user" , messages:conversation.message});
      
    } catch (error) {
      console.log(error.message)
        return res.status(500).json({error:true, message:"internal server error"})
    }
})

//inser in the contact and fetch the updated contact
//create new message 
//save new message


 app.delete('/deleteConversation/:id' , authenticateToken, async(req,res)=>{


        try {

          const {id:receiverID} = req.params;
          const {_id} = req.user;
          let contactDoc = await Contacts.findOneAndUpdate({$and:[{contacts:{$in:[receiverID]}},{userID:_id} ]}, {$pull:{contacts: receiverID}},{new:true}).populate(
            {
              path: 'contacts',
              select: 'userName _id'
            }
          )

          if(contactDoc==null){
            contactDoc = await Contacts.findOne({userID:_id}).populate(
              {path: 'contacts',select: 'userName _id'
              });
              console.log("was null: " +contactDoc)

            return res.status(200).json({error:true,message:"chat does not exist", userInfo:{...req.user}, contacts: contactDoc.contacts, redirect:'/home/welcome' })
          }
          console.log("updated doc: " +contactDoc)
          return res.status(200).json({error:false, message: "chat deleted successfully", userInfo:{...req.user}, contacts: contactDoc.contacts, redirect:'/home/welcome'})


        } catch (error) {
            return res.status(500).json({error:true, message:'internal server error'});
        }

       
        

 })




app.put("/dummy", async (req, res) => {
  try {
    const { email, newUser } = req.body;
   
    // Validate request data
    if (!email || !newUser) {
      return res
        .status(400)
        .json({ message: "Email and newUsername are required" });
    }

    // Update the username directly in the database
    const result = await User.updateOne(
      { email }, // Filter to find the user by email
      { $set: { user: newUser } } // Update operation
    );


    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({
          message:
            "User not found or username is the same as the current value",
        });
    }

    res.status(200).json({ message: "Username updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
