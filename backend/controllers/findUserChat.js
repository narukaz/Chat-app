import mongoose from "mongoose";
import  {Chat}  from "../modal/conversationModel.js";


const findUserChat= async(req)=>{
   try {
    const data = await Chat.findOne({participants:{$all:[req.user._id, req.params.id]}}).populate("message")
    if(data == null){
    return false
    }
    return data

   } catch (error) {
    console.log("error in the findUserChat:  ", error)
   }
}

export default findUserChat

