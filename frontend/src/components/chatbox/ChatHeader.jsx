import React from 'react'
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

function ChatHeader({talkingTo ,onDeleteConversation}) {
  return (
    <div className="bg-tertiary-bg py-6 px-8 rounded-[20px] flex justify-between items-center text-text-secondary">
    <label className="font-fira font-bold">
  <AccountCircleIcon className="mr-2 cursor-pointer hover:scale-[1.2] transition-transform duration-300 hover:text-accent-blue  " />
  {talkingTo}</label>
  <DeleteForeverRoundedIcon onClick={onDeleteConversation} className="cursor-pointer hover:scale-[1.2] transition-transform duration-300 hover:text-accent-red" />
    
  </div>
  )
}

export default ChatHeader
