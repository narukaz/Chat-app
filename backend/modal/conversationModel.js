import mongoose from "mongoose";
import User from "./userModel.js";




const conversationSchema = new mongoose.Schema({
       
        participants:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        message:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"}],
            
        });

export const Chat = mongoose.model("Chat", conversationSchema);