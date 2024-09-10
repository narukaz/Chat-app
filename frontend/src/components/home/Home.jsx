import React, { useEffect, useContext, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import DataContext from "../context/data/dataContext";
import api from "../../axios/api";
import AddFriend from "../addfriend/AddFriend";


function Home() {
  const navigate = useNavigate();
  const {setUserInfo ,toggleAddFriend, setToggleAddFriend} = useContext(DataContext);


  //handle add friend
  const secureLog = async () => {
    api.defaults.withCredentials = true;
    await api
      .post("/home")
      .then((res) => {
        setUserInfo(res.data?.userInfo);
        localStorage.setItem('userInfo', JSON.stringify(res.data?.userInfo));
      })
      .catch((err) => {
        console.log(err);
        return navigate(err?.response?.data?.redirect);
      });
  };

  useEffect(() => {
    secureLog();
  }, []);


  return (
    < >
    <div className="bg-primary-bg w-full h-full rounded-xl flex overflow-hidden">
      <Sidebar setToggleAddFriend={setToggleAddFriend}/>
      {toggleAddFriend &&  <AddFriend />}
      <Outlet />
    </div>
    </ >
  );
}

export default Home;
