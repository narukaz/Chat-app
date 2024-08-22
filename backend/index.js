import express from "express";
import cookies from "cookie-parser";
//db embed
import connectToDatabase from "./config/config.js";
import User from "./modal/userModal.js";
connectToDatabase();
//------------------//

import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { signToken} from "./utils/jwtAuth.js";
import { authenticateToken } from "./middleware/authMiddleware.js";

const app = express();

const server = http.createServer(app);

app.use(express.json());
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true,
}));
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
io.on("connection", (socket) => {
  socket.on("connectTo", (data) => {
    socket.join(data);
    console.log(data);
  });
  socket.on("send_message", (data) => {
    socket.to(data.id).emit("received_message", data);
    console.log(data.message);
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

  const { user, email, password } = req.body;

  // Validate input fields
  if (!user) {
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
    const newUser = new User({ user, email, password });
    await newUser.save(); // Fix: Call save() method

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
    console.log("Existing User:", user);

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

    const token = signToken({ user: user.user, email });
    res.cookie("token", token, {
      httpOnly: false,
      // secure:true
    });
    return res
      .status(200)
      .json({
        error: false,
        message: "Login successful",
        userInfo: { chatId: user.chatId, user: user.user, email },
        navigate :'home'
      });
  } catch (error) {
    console.error("Internal server error:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
});

app.post("/home", authenticateToken, (req, res) => {
  return res.status(200).json({
    error: false,
    message: "fetched",
    redirect: null,
  });
});
