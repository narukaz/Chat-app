import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DataContext from "../context/data/dataContext";
//socket io implementation
import ChatViewer from "./ChatViewer";
import ChatHeader from "./ChatHeader";
import Input from "./Input";
import api from "../../axios/api";
import { io } from "socket.io-client";


let socket;

function Chatbox() {
  const [receiverID, setReceiverID]= useState(null)

  const [requestedUser, setRequestedUser] = useState("");
  const {userInfo, setContacts,contacts,messages, setMessages,selectedUser} = useContext(DataContext); //saved userinfo from context
  const [isEditMode, setIsEditMode] = useState(false); //edit mode
  const [message, setMessage] = useState(""); //record messages
  const [editMessageID, setEditMessageID] = useState(""); //record messages


  const sendMessage = async() => {
    if(isEditMode){
      api.defaults.withCredentials = true;
      const {data:{updatedMessage}} = await api.patch("/updateMessage", {messageID:editMessageID,updatedMessage:message})
      console.log(updatedMessage)
      if(updatedMessage != null){
        let tempStore =[]
        const messageIndex = messages.findIndex(message => message._id == updatedMessage._id )
        tempStore = [...messages];
        tempStore[messageIndex] = updatedMessage
        setIsEditMode(false)
        setMessages(tempStore)
        setEditMessageID("")
        setMessage("")

        socket.emit("updatedMessage" ,updatedMessage)



      }
      return
    }


    if (message) {
      let data = { message, receiver: selectedUser };
      socket.emit("messageFromClient", data);
      setMessages(prev => [...prev, {...data, sender:userInfo._id}])
      setMessage("");
    }
  };

  //fetch data at start


  const fetchRequestedUserData = async () => {
    //fetching requested user data
    try {
      api.defaults.withCredentials = true;
      const {data} = await api.post(`/chat/${selectedUser}`);
      console.log(data)

      if (data !== null) {
        setRequestedUser(data?.talkingTo); //seting up the second user
        setMessages([...data?.messages]); //refering to the messages object received

       
          

      
      
    }}
      catch (error) {
      console.log(" error at fetch chat data is :", error);
    }
  };

  const handleOnMessageEdit =(message,id)=>{
    setEditMessageID(id);
    setMessage(message);
    setIsEditMode(true);

  }


  
  useEffect(() => {
    setReceiverID(selectedUser)
    fetchRequestedUserData();
  }, [selectedUser]);

  useEffect(() => {
    //connecting at mount with socket
    const socketAuthID = JSON.parse(localStorage.getItem("userInfo"));
    console.log(socketAuthID._id);

    if (socketAuthID) {
      socket = io("http://localhost:3000", {
        auth: { userID: socketAuthID._id },
        withCredentials: true,
      });
    }

    socket.on("connect", () => console.log("socketON"))

    socket.on("messageFromServer", (data) => {
      console.log("messageFromServer: ", data.receiver)
      if(data.sender == selectedUser)
      {setMessages((prev) => [...prev, data])}
    })


    socket.on("updatedMessageFromServer", (updatedMessage)=>{
      if(updatedMessage != null){
        let tempStore =[]
        const messageIndex = messages.findIndex(message => message._id == updatedMessage._id )
        tempStore = [...messages];
        tempStore[messageIndex] = updatedMessage
        setMessages(tempStore)
      }
    })

    return () => {
      socket.off("messageFromServer");
      socket.disconnect();
    };
  }, [userInfo]);

  return (
    <div className="bg-secondary-bg flex-[0.7] flex flex-col gap-[20px] px-6 py-4">
      <ChatHeader requestedUser={requestedUser?.userName} deleteID={selectedUser} />
      <ChatViewer handleOnMessageEdit={handleOnMessageEdit}/>
      <Input
        sendMessage={sendMessage}
        setMessage={setMessage}
        message={message}
      />
    </div>
  );
}

export default Chatbox;
