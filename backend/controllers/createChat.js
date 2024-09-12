import mongoose from "mongoose";
import  {Chat}  from "../modal/conversationModel.js";


const createChat= async(req)=>{
    console.log(req.user._id, req.params.id);
    
   try {
    const data = await Chat.create({
            participants:[req.user._id, req.params.id],
            message:[]
    })
    console.log(data)
    if(data == null){
    return false
    }
    return data

   } catch (error) {
    console.log("error in the findUserChat:  ", error)
   }
}

export default createChat

