import express from 'express'

//db embed
import mongoose from 'mongoose'
import connectToDatabase from './config/config.js'
import User from './modal/userModal.js';
connectToDatabase();
//------------------//


import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { error, log } from 'console';

const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(cors());


// const io = new Server(server, 
//     {cors:{
//         origin: "http://localhost:5173",
//         methods:["GET", "POST"]
//     }});





//scoket io code
// io.on("connection", (socket)=>{
    

//      socket.on("connectTo", (data)=>{
//         socket.join(data);
//         console.log(data)
//      });
//      socket.on("send_message", (data)=>{
//         socket.to(data.id).emit("received_message", data);
//         console.log(data.message)
//      })
     
    
     

     
// })

//enviromental variables


const PORT = process.env.PORT ||3000;
server.listen(PORT,()=>{console.log("server is up")})


app.post('/sign-up', async (req, res) => {
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
            return res.status(400).json({ error:true,message: "Email already exists" });
        }

        // Create new user and save to database
        const newUser = new User({ user, email, password });
        await newUser.save(); // Fix: Call save() method

        return res.status(201).json({error:false, message: 'User registered successfully.' });

    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

app.post('/', async(req,res)=>{
    const {user, password} =req.body;
    console.log(req.body);
    try {


        if (Object.keys(req.body).length==0 && !user || !password) return res
        .status(400)
        .json({error:true, message:"fill userId and Password"});

        //credential check code

        const existingUser = await User.findOne({user});

        if((existingUser)){
            if(password !== existingUser.password){
                return res
                .status(401)
                .json({error:true, message: "wrong password"})
            }
            else if(password === existingUser.password){
                return res
                .status(200)
                .json({error:false, message:"data matched"})
            }
        }
        else return res
        .status(404)
        .json({error:true, message:"wrong credentials or account does not exist"})




    } catch (error) {
        return res.status(500).json({error:true, message: "internal server error"})
    }
});