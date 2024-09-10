import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DataContext from "../context/data/dataContext";
//socket io implementation
import ChatViewer from "./ChatViewer";
import ChatHeader from "./ChatHeader";
import Input from "./Input";
import api from "../../axios/api";
import { io } from "socket.io-client";

let socket;

function Chatbox() {
  const { id } = useParams();
  const [requestedUser, setRequestedUser] = useState("");
  const { setMessages, userInfo } = useContext(DataContext); //saved userinfo from context
  const [isEditMode, setIsEditMode] = useState(false); //edit mode
  const [message, setMessage] = useState(""); //record messages

  const sendMessage = () => {
    if (message) {
      let data = { message, receiver: id };
      socket.emit("messageFromClient", data);
      setMessage("");
    }
  };

  socket?.once("messageFromServer", (data) => {
    console.log("messageFromServer: ", data);
    setMessages((prev) => [...prev, data]);
  });

  //   useEffect(() => {
  //     socket.on("messageFromServer", data)
  //     setMessages(prev=> [...prev,data])
  //     return ()=>{
  //       socket.off("messageFromServer")
  //     }
  // },[socket])

  //fetch data at start

  const fetchRequestedUserData = async () => {
    //fetching requested user data
    try {
      api.defaults.withCredentials = true;
      const { data } = await api.post(`/chat/${id}`);
      if (data !== null) {
        setRequestedUser(data?.talkingTo); //seting up the second user
        setMessages(data?.messages || []); //refering to the messages object received
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchRequestedUserData();
  }, [id]);

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
    console.log(socket);
    socket.on("connect", () => console.log("socketON"));

    return () => {
      socket.off("connect");
      socket.disconnect();
    };
  }, [userInfo]);

  return (
    <div className="bg-secondary-bg flex-[0.7] flex flex-col gap-[20px] px-6 py-4">
      <ChatHeader requestedUser={requestedUser.userName} deleteID={id} />
      <ChatViewer />
      <Input
        sendMessage={sendMessage}
        setMessage={setMessage}
        message={message}
      />
    </div>
  );
}

export default Chatbox;
