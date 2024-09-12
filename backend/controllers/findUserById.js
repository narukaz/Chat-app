import mongoose from "mongoose";
import User from "../modal/userModel.js";

const findUserById = async(req,res) => {
  try {
    let receiverID = req.params.id;
   
    const data = await User.findById(receiverID).select("-password -socketID -chatId");
    if (data == null) {
        
      return res.status(404).json({
        error: true,
        message: "userDoesNotExists",
        talkingTo: "UserDoesNotExist",
        messages: [],
      })

    }

    return data //returning if data
  } catch (error) {
    console.log("error in the findUserById:  ", error);
    return res.status(500).json({
        error: true,
        message: "internal server error",
      })
  }
};

export default findUserById;
