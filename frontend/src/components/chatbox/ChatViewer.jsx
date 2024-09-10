import React, { useContext, useEffect, userState, useState } from "react";
import DataContext from "../context/data/dataContext";
import EditIcon from "@mui/icons-material/Edit";

function ChatViewer() {
  const {userInfo, messages } = useContext(DataContext);
  const [isHoverd, setIsHovered] = useState(false);
  useEffect(() => {}, [messages]);
  return (
    <div
      className=" bg-tertiary-bg flex-1 rounded-[20px] py-2 px-4 flex flex-col gap-3 overflow-x-scroll" >

      {messages?  messages.map((dialouge, index) => {
        if (dialouge.sender == userInfo._id) {
          return (
            <div
              onMouseOver={()=>{console.log(dialouge)}}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="self-end bg-primary-bg p-2 flex gap-5 rounded-tl-[10px] rounded-tr-[10px] rounded-bl-[10px] max-w-[80%]"
              key={index}
            >
              <h3 className="font-fira text-text-primary">
                {dialouge.message}
              </h3>
              <EditIcon
                className="cursor-pointer text-text-secondary"
                style={{
                  visibility: isHoverd ? "visible" : "hidden",
                  display: isHoverd ? "block" : "none",
                  transition: "all 0.5s ease, transform 0.5s ease",
                }}
              />
            </div>
          );
        } else
          return (
            <div
              className="self-start bg-secondary-bg p-2 rounded-tl-[10px] rounded-tr-[10px] rounded-br-[10px] max-w-[80%]"
              key={index}
            >
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
