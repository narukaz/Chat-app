import mongoose from "mongoose";
import User from "./userModal";

const conversationSchema = new mongoose.Schema({
    user:{
        type:String,
        unique:true,
        required:true,
        ref:User
    }
})