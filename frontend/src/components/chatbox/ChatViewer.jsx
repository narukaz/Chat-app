import React, { useContext, useEffect, userState, useState } from "react";
import DataContext from "../context/data/dataContext";

import ReceiverMessage from "./ReceiverMessage.jsx";

function ChatViewer({setIsEditMode,handleOnMessageEdit}) {
  const {userInfo, messages } = useContext(DataContext);
 
  useEffect(() => {}, [messages]);
  return (
    <div
      className=" bg-tertiary-bg flex-1 rounded-[20px] py-2 px-4 flex flex-col gap-3 overflow-x-scroll" >

      {messages?  messages.map((dialouge, index) => {
        if (dialouge.sender == userInfo._id) {
          return (
           <ReceiverMessage  key={index} message={dialouge.message}  handleOnMessageEdit={handleOnMessageEdit} messageID={dialouge._id} />
          );
        } else
          return (
            <div
              className="self-start bg-secondary-bg p-2 rounded-tl-[10px] rounded-tr-[10px] rounded-br-[10px] max-w-[80%]"
              key={index}>
              <h3 className="font-fira text-text-primary">
                {dialouge.message}
              </h3>
            </div>
          );
      }): ""}
    </div>
  );
}

export default ChatViewer;
