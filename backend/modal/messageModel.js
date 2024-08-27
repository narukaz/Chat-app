import mongoose, { mongo } from "mongoose";


 const MessageSchema = new mongoose.Schema({
    sender: {
     type: mongoose.Schema.Types.ObjectId,
     ref:"User",
     required: true
    },
    receiver: {
     type: mongoose.Schema.Types.ObjectId,
     ref:"User",
     required: true
    },
    message:{type:String, required:true, default:""} 
 })

 export const Message = mongoose.model("Message", MessageSchema)