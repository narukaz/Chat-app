import React, {useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DataContext from '../context/data/dataContext';
import LogoutIcon from '@mui/icons-material/Logout';
import api from '../../axios/api';


function Sidebar() {

    api.defaults.withCredentials=true;
    const {userInfo,toggleAddFriend, setToggleAddFriend,contacts,setContacts,setSelectedUser} = useContext(DataContext);
    const navigate = useNavigate();


        const naviagetToConversation = () =>{
        navigate(`chat`)}  

        const fetchContacts = async (url) => {//fetchContacts
          console.log("fetchContact is running!")
          api.defaults.withCredentials = true
          await api
            .get(url)
            .then((res) => {
            setContacts(res.data.contacts)   
            })
            .catch((err) => console.log(err.message)); }


        const handleOnLogout =async()=>{
          
          try {
            api.defaults.withCredentials = false
             const res = await api.post('/logout')
             console.log(res.data)
             localStorage.removeItem('token')
             localStorage.removeItem('userInfo')
             document.cookie = 'token =""'
             navigate('/')
            
          } catch (error) {
            navigate('/')
          }
        }

useEffect(()=>{
  fetchContacts('/fetchContacts')
},[])

  

  return (
    <div className='bg-primary-bg flex-[0.3] flex flex-col gap-[20px] px-6 py-4'>
    <div className='bg-tertiary-bg py-6 px-4 rounded-[20px] flex justify-between items-center text-text-secondary'>
    <label className='font-fira font-bold'>
      
    <AccountCircleIcon className='cursor-pointer pr-2'/>{userInfo?.userName|| "cannot fetch"}</label>

    <div>
      <AddCircleIcon
    className='cursor-pointer'
    onClick={()=>setToggleAddFriend(prev=>!prev)}/>
    <LogoutIcon
    onClick={handleOnLogout}
    className='ml-2 cursor-pointer'/></div>
    </div>
   
    <div><input type="text" className='bg-tertiary-bg w-full py-3 px-4 rounded-[15px] font-fira text-[20px] text-text-secondary' placeholder='search'/></div>
    <div className= 'bg-tertiary-bg flex-1 rounded-[20px] py-6 px-4 flex flex-col gap-3'>
      { contacts && contacts.map((item,index)=> {
        return (
          <div key={index}
          // onMouseOver={()=>console.log(item._id)}
          onClick={()=>{
            naviagetToConversation(item._id)
            setSelectedUser(item._id)
          }}
          className='bg-secondary-bg py-4 px-3 rounded-md text-text-secondary flex flex-col cursor-pointer'>
            <h1 className='font-fira font-semibold'>{item?.userName}</h1>
            <div className='flex justify-between'><h3 className='font-fira font-normal'>{""}</h3>
            <p className='font-fira font-thin self-end'>{""}</p></div>
          </div>
        )
      })}
    </div>
    </div>
  )
}

export default Sidebar
