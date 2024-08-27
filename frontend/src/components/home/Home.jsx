import React, { useEffect, useContext } from 'react'
import Sidebar from '../sidebar/Sidebar'
import { Outlet , useNavigate} from 'react-router-dom'
import DataContext from '../context/data/dataContext'
import api from '../../axios/api'

function Home() {
  const navigate = useNavigate();
 const {userInfo, setUserInfo , contacts, setContacts}= useContext(DataContext);


  const secureLog = async() => {
    api.defaults.withCredentials=true;
    await api.post("/home",)
    .then(res=> {
        setUserInfo(res.data?.userInfo)
        setContacts(res.data?.contacts || [])
        
      })
      
    .catch(err=>  {
      return navigate(err?.response?.data?.redirect) })
    }
    

    

  useEffect(()=>{
    
    secureLog();
    console.log("userinfo in home" + userInfo,contacts);
  },[])



  return (
    <div className='bg-primary-bg w-full h-full rounded-xl flex overflow-hidden'>
      <Sidebar/>
      <Outlet/>
    </div>
  )
}

export default Home;
