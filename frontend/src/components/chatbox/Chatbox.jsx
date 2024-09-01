import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import DataContext from "../context/data/dataContext";
//socket io implementation
import { io } from "socket.io-client";





import api from "../../axios/api";
import ChatViewer from "./ChatViewer";
import ChatHeader from "./ChatHeader";

function Chatbox() {
  



  const navigate = useNavigate();
  const [talkingTo, setTalkingTo] = useState("");
  const { id } = useParams();
  const {userInfo, setUserInfo, setContacts } =
  useContext(DataContext);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);


//socket code
  const socket = io.connect("http://localhost:3000", {auth:{
    userID:userInfo._id
  }});

  const secureLog = async () => {
    console.log("Chat ID from useParams:", id);
    api.defaults.withCredentials = true;
    await api
      .post(`/chat/${id}`)
      .then((res) => {
        setTalkingTo(res.data.talkingTo);
        setUserInfo(res.data.userInfo);
        setConversation(res.data.conversation)
        console.log(res.data)
      })
      .catch((err) => {
        return navigate(err?.response?.data?.redirect);
      });
  };

  const onDeleteConversation = async () => {
    api.defaults.withCredentials = true;
    await api
      .delete(`/deleteConversation/${id}`, { message: message })
      .then((res) => {
        setContacts(res.data.contacts);
        setConvData(res.data.messages);
        setMessage("");
        return navigate(err?.response?.data?.redirect);
      })
      .catch((err) => {
        console.log(err.message);
        return navigate(err?.response?.data?.redirect);
      });
  };

  // sending message to server
  




  const data = {receiver: id,
    message,
    sender: userInfo._id,}


  const sendMessage = (message) => {
    socket.emit("messageFromClient", data) 
    setMessage("");
    setConversation((prevData) => [...prevData,{
      receiver: id,
      message,
      sender: userInfo._id,
    }])
  };

  // informing user of the action
  useEffect(() => {
    socket.on("messageFromServer", (data) => {
      setConversation((prevData) => [...prevData, data]);
      setMessage("");
    });
  }, [socket]);




  useEffect(() => {
    secureLog();
  }, []);

  return (
    <div className="bg-secondary-bg flex-[0.7] flex flex-col gap-[20px] px-6 py-4">
      <ChatHeader
        talkingTo={talkingTo}
        onDeleteConversation={onDeleteConversation}
      />
      <ChatViewer conversation={conversation} />
      <div className="flex items-center bg-transparent">
        <input
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className="w-[92%] py-6 px-4 bg-tertiary-bg text-text-primary rounded-[20px] text-[20px]"
        />
        <div className="mx-auto cursor-pointer bg-tertiary-bg text-text-secondary rounded-full text-center p-5 hover:scale-[1.1] duration-300 hover:text-accent-green ">
          <SendRoundedIcon
            onClick={() => {
              sendMessage(message);
            }}
            className="!text-[30px] cursor-pointer translate-x-[3px] hover:scale-[1.5] duration-300 "
          />
        </div>
      </div>
    </div>
  );
}

export default Chatbox;
