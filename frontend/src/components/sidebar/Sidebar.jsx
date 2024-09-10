import React, {useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DataContext from '../context/data/dataContext';
import api from '../../axios/api';


function Sidebar() {
api.defaults.withCredentials=true;
const {userInfo,toggleAddFriend, setToggleAddFriend,contacts,setContacts} = useContext(DataContext);
const navigate = useNavigate();

        const naviagetToConversation = (userId) =>{
        navigate(`chat/${userId}`)}  


        const fetchContacts = async (url) => {//fetchContacts
          console.log("fetchContact is running!")
          api.defaults.withCredentials = true
          await api
            .get(url)
            .then((res) => {
            setContacts(res.data.contacts)   
            })
            .catch((err) => console.log(err.message));
        }

useEffect(()=>{
  fetchContacts('/fetchContacts')
},[])

  

  return (
    <div className='bg-primary-bg flex-[0.3] flex flex-col gap-[20px] px-6 py-4'>
    <div className='bg-tertiary-bg py-6 px-4 rounded-[20px] flex justify-between items-center text-text-secondary'>
    <label className='font-fira font-bold'><AccountCircleIcon className='cursor-pointer pr-2'/>{userInfo?.userName|| "cannot fetch"}</label>
    <div><AddCircleIcon
    className='cursor-pointer'
    onClick={()=>setToggleAddFriend(prev=>!prev)}/></div>
    </div>
    <div><input type="text" className='bg-tertiary-bg w-full py-3 px-4 rounded-[15px] font-fira text-[20px] text-text-secondary' placeholder='search'/></div>
    <div className= 'bg-tertiary-bg flex-1 rounded-[20px] py-6 px-4 flex flex-col gap-3'>
      { contacts && contacts.map((item,index)=> {
        return (
          <div key={index}
          // onMouseOver={()=>console.log(item._id)}
          onClick={()=>{naviagetToConversation(item._id)}}
          className='bg-secondary-bg py-4 px-3 rounded-md text-text-secondary flex flex-col cursor-pointer'>
            <h1 className='font-fira font-semibold'>{item?.userName}</h1>
            <div className='flex justify-between'><h3 className='font-fira font-normal'>{"defeault"}</h3>
            <p className='font-fira font-thin self-end'>{""}</p></div>
          </div>
        )
      })}
    </div>
    </div>
  )
}

export default Sidebar
