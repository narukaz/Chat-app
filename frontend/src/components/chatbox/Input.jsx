import React,{useState} from 'react'
import SendRoundedIcon from "@mui/icons-material/SendRounded";
function Input({isEditMode,setIsEditMode, sendMessage, setMessage, message}) {









  return (
    <div className="flex items-center bg-transparent">
    <input
    value={message}
    onChange={(e)=>setMessage(e.target.value)}
    className="w-[92%] py-6 px-4 bg-tertiary-bg text-text-primary rounded-[20px] text-[20px]" />
    <div className="mx-auto cursor-pointer bg-tertiary-bg text-text-secondary rounded-full text-center p-5 hover:scale-[1.1] duration-300 hover:text-accent-green ">
      <SendRoundedIcon
        onClick={sendMessage}
      className="!text-[30px] cursor-pointer translate-x-[3px] hover:scale-[1.5] duration-300 " />
    </div>
  </div>
  )
}

export default Input
