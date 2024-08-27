import React, { useEffect } from 'react'
import Sidebar from '../sidebar/Sidebar'
import { Outlet , useNavigate} from 'react-router-dom'
import api from '../../axios/api'

function Home() {
  const navigate =useNavigate();
  const secureLog = () => {
    api.defaults.withCredentials=true;
    api.post("/home")
    .then(res=> {
      console.log("you are at /home")
      })
      
    .catch(err=>  {
      return navigate(err?.response?.data?.redirect) })
    }
    



  useEffect(()=>{
    secureLog();
  },[])



  return (
    <div className='bg-primary-bg w-full h-full rounded-xl flex overflow-hidden'>
      <Sidebar/>
      <Outlet/>
    </div>
  )
}

export default Home;
