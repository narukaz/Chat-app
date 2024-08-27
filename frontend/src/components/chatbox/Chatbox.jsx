import React,{useContext, useState, useEffect, } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import DataContext from "../context/data/dataContext";
import Modal from 'react-modal';
//socket io implementation
import io from "socket.io-client"
import api from "../../axios/api";


const socket = io.connect("http://localhost:3000");

function Chatbox() {
  
  const navigate = useNavigate();
  const [talkingTo, setTalkingTo] = useState("");
  const {id} = useParams();
  const {convData, setConvData,userInfo, setUserInfo, setContacts}=useContext(DataContext);
  const [message, setMessage] =useState("");


  const secureLog = async () => {
    console.log('Chat ID from useParams:', id );
    api.defaults.withCredentials=true;
    await api.post(`/chat/${id}`)
    .then(res => {
      setTalkingTo(res.data.receiver)
      setUserInfo(res.data.userInfo);
      setContacts(res.data.contacts)
      const conversationData = res.data.conversationData
      setConvData(conversationData|| []);
      setTalkingTo(res.data.talkingTo.userName);
  

      })
      
    .catch(err=>  {
      return navigate(err?.response?.data?.redirect) })
    }
    


 const onDeleteConversation=async ()=>{
  api.defaults.withCredentials=true;
  await api.delete(`/deleteConversation/${id}`, {message:message})
  .then((res)=>{
    setContacts(res.data.contacts)
    setConvData(res.data.messages)
    setMessage("");
    return navigate(err?.response?.data?.redirect) 
  } 
  ).catch(err=>  {
    console.log(err.message)
    return navigate(err?.response?.data?.redirect)})
 }





  const sendMessage = async(message)=>{
    // socket.emit("send_message", {id, message});
    api.defaults.withCredentials=true;
    await api.post(`/sendMessage/${id}`, {message:message})
    .then((res)=>{
      setContacts(res.data.contacts)
      setConvData(res.data.messages)
      setMessage("");
    } 
    ).catch(err=>  {
      console.log(err.message)
      return navigate(err?.response?.data?.redirect)})
  }


  const joinUser =( )=>{
    if(id !==""){
      socket.emit("connectTo" , id)
    }
  }


useEffect(()=>{
  secureLog();
  joinUser();
  socket.on("received_message", (data)=> {
    alert(data.message)
  })},[id])



  return (
     


    <div className="bg-secondary-bg flex-[0.7] flex flex-col gap-[20px] px-6 py-4">
      <div className="bg-tertiary-bg py-6 px-8 rounded-[20px] flex justify-between items-center text-text-secondary">
        <label className="font-fira font-bold">
      <AccountCircleIcon className="mr-2 cursor-pointer hover:scale-[1.2] transition-transform duration-300 hover:text-accent-blue  " />
      {talkingTo}</label>
      <DeleteForeverRoundedIcon onClick={onDeleteConversation} className="cursor-pointer hover:scale-[1.2] transition-transform duration-300 hover:text-accent-red" />
        
      </div>
      <div className=" bg-tertiary-bg flex-1 rounded-[20px] py-2 px-4 flex flex-col gap-3 overflow-x-scroll">
      {/* adding styles */}
      
      {convData.reverse().map((dialouge,index)=>{

                    if(dialouge.sender == userInfo._id){
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
