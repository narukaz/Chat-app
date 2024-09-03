import React, { useEffect, useContext, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import DataContext from "../context/data/dataContext";
import api from "../../axios/api";
import AddFriend from "../addfriend/AddFriend";


function Home() {
  const [isAddFriend, setIsAddFriend ] = useState(false);
  const navigate = useNavigate();
  const { userInfo, setUserInfo, contacts, setContacts, renderHome } =
    useContext(DataContext);


  //handle add friend
  const handleAddfriend = () => {
    setIsAddFriend((previous) => !previous);
  }

  const secureLog = async () => {
    api.defaults.withCredentials = true;
    await api
      .post("/home")
      .then((res) => {
        setUserInfo(res.data?.userInfo);
        setContacts(res.data?.contacts || [])
      })

      .catch((err) => {
        console.log(err);
        return navigate(err?.response?.data?.redirect);
      });
  };

  useEffect(() => {
    secureLog();
    // console.log("userinfo in home" + userInfo,contacts);
  }, [renderHome]);


  return (
    < >
    <div className="bg-primary-bg w-full h-full rounded-xl flex overflow-hidden">
      <Sidebar isAddFriend={handleAddfriend} />
      {isAddFriend &&  <AddFriend handleAddfriend={handleAddfriend} />}
      <Outlet />
    </div>
    </ >
  );
}

export default Home;
