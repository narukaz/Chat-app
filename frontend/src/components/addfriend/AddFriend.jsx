import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import api from '../../axios/api';
import DataContext from '../context/data/dataContext';

function AddFriend() {
    const [err ,setErr]  = useState('');
    const [email, setEmail] = useState('')
    const navigate = useNavigate();
    const {setToggleAddFriend,userInfo,setContacts,contacts} = useContext(DataContext)
    const requestID = async ()=>{

        try {
            if(email ==""){
            return  setErr("please input email")
            }
            const res = await api.post('/addFriend', {email})
            if(!res.data.user)
            {   //if empty res
                return setErr(res.data.message)
            }

            else{//if res 
              console.log(res.data)
                setContacts([res.data.user, ...contacts])
                navigate(`chat/${res.data.user._id}`)
                setToggleAddFriend( prev => !prev )
                
            }


        } catch (error) {
                setErr(error.message)
        }
    }


    const onCloseHandler = ()=>{
        setToggleAddFriend(false)
    }

    const getExistingContacts = async() =>{
           
          try {
            const contacts = await api.get('/fetchContacts', {_id:userInfo._id})
            console.log(contacts)
          } catch (error) {
            console.log(error.message)
          }
    }








  return (
    <div className='bg-primary-bg absolute left-[250px] top-[130px] rounded-xl p-5 border border-gray-500 '>
        <CancelIcon onClick={onCloseHandler} className='text-[#f04747] cursor-pointer absolute -left-[8px] -top-[8px]'/>
    <div className='flex items-center gap-[10px] border-1 border-solid border-white '> 
        <input type='text' value={email} onChange={({target}) => setEmail(target.value)} placeholder='input email' className='h-[50px] rounded-xl outline-none pl-5 font-fira bg-tertiary-bg text-text-secondary'/>
        <AddCircleIcon  onClick={requestID} className='text-text-secondary text-[60px] cursor-pointer transition-transform hover:scale-[1.2] hover:text-text-primary ' />
    </div>
    
    { err &&  <p className='pl-1 text-red-400 text-[15px]' >{err}</p>}
    </div>
  )
}

export default AddFriend
