import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

function Chatbox() {
  return (
    <div className="bg-secondary-bg flex-[0.7] flex flex-col gap-[20px] px-6 py-4">
      <div className="bg-tertiary-bg py-6 px-8 rounded-[20px] flex justify-between items-center text-text-secondary">
      <AccountCircleIcon className="cursor-pointer hover:scale-[1.2] transition-transform duration-300 hover:text-accent-blue  " />
      <DeleteForeverRoundedIcon className="cursor-pointer hover:scale-[1.2] transition-transform duration-300 hover:text-accent-red" />
        
      </div>
      <div className=" bg-tertiary-bg flex-1 rounded-[20px] py-6 px-4"></div>
      <div className="flex items-center bg-transparent">
      <input className="w-[92%] py-6 px-4 bg-tertiary-bg text-text-primary rounded-[20px] text-[20px]" />
      <div className="mx-auto bg-tertiary-bg text-text-secondary rounded-full text-center p-5 hover:scale-[1.1] duration-300 hover:text-accent-green ">
      <SendRoundedIcon className="!text-[30px] cursor-pointer translate-x-[3px] hover:scale-[1.5] duration-300 " />
      </div>
      </div>
    </div>
  );
}

export default Chatbox;
