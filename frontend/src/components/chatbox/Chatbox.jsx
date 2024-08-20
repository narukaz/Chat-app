import React,{useContext, useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import DataContext from "../context/data/dataContext";
//socket io implementation
import io from "socket.io-client"

const socket = io.connect("http://localhost:3000");

function Chatbox() {
  const params = useParams();
  const {id} = params;
  const {convData, setConvoData}=useContext(DataContext);
  const {conversation} = convData[id];

  const [message, setMessage] =useState("");

  const sendMessage =(message)=>{
    socket.emit("send_message", {id, message});
    setMessage("");

  }


  const joinUser =( )=>{
    if(id !==""){
      socket.emit("connectTo" , id)
    }
  }


useEffect(()=>{
  joinUser();
  socket.on("received_message", (data)=> {
    alert(data.message);
    setConvoData(convData.id.conversation.push({sender:false, message: data.message}));
    console.log(convData)
  });
  
},[socket, convData])



  return (
    <div className="bg-secondary-bg flex-[0.7] flex flex-col gap-[20px] px-6 py-4">
      <div className="bg-tertiary-bg py-6 px-8 rounded-[20px] flex justify-between items-center text-text-secondary">
      <AccountCircleIcon className="cursor-pointer hover:scale-[1.2] transition-transform duration-300 hover:text-accent-blue  " />
      <DeleteForeverRoundedIcon className="cursor-pointer hover:scale-[1.2] transition-transform duration-300 hover:text-accent-red" />
        
      </div>
      <div className=" bg-tertiary-bg flex-1 rounded-[20px] py-2 px-4 flex flex-col gap-3 overflow-x-scroll">
      {/* adding styles */}
      
      {conversation.reverse().map((dialouge,index)=>{

                    if(dialouge.sender === false){
                      return (
                       
                        <div className="self-end bg-primary-bg p-2 rounded-tl-[10px] rounded-tr-[10px] rounded-bl-[10px] max-w-[80%]" key={index}>
                          <h3 className="font-fira text-text-primary">{dialouge.message}</h3>
                        </div>
                        
                      )}

                      else return(
                        <div className="self-start bg-secondary-bg p-2 rounded-tl-[10px] rounded-tr-[10px] rounded-br-[10px] max-w-[80%]" key={index}>
                          <h3 className="font-fira text-text-primary">{dialouge.message}</h3>
                        </div>
                      )


      })}
      
      
      

      </div>
      <div className="flex items-center bg-transparent">
      <input
      value={message}
      onChange={(e)=>{setMessage(e.target.value)}}
      className="w-[92%] py-6 px-4 bg-tertiary-bg text-text-primary rounded-[20px] text-[20px]" />
      <div 
      
      className="mx-auto cursor-pointer bg-tertiary-bg text-text-secondary rounded-full text-center p-5 hover:scale-[1.1] duration-300 hover:text-accent-green ">
      <SendRoundedIcon
      onClick={()=>{sendMessage(message)}}
      className="!text-[30px] cursor-pointer translate-x-[3px] hover:scale-[1.5] duration-300 " />
      </div>
      </div>
    </div>
  );
}

export default Chatbox;
