import React, { useContext, useState } from 'react'
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import api from '../../axios/api';
import DataContext from '../context/data/dataContext';
import {useNavigate } from 'react-router-dom';

function ChatHeader({requestedUser,deleteID}) {
  const navigate = useNavigate()
  const {contacts, setContacts} = useContext(DataContext)

  const removeContactFromState = (deleteID)=>{
    console.log("deletedID inside array mutation is," ,deleteID)
    console.log("current contacts:",contacts)
    const updatedContacts = contacts.filter(contact => contact._id != deleteID)
    console.log(updatedContacts)
    setContacts(updatedContacts)
  }

  const handleOnDelete = async(deleteID) =>{
    console.log(deleteID)
    try {
      const res= await api.delete(`/deleteConversation/${deleteID}`);
      if(!res.data.error) {
        removeContactFromState(deleteID)
        return navigate('/home')}
    } catch (err) {
      navigate('/home')}}




  return (
    <div className="bg-tertiary-bg py-6 px-8 rounded-[20px] flex justify-between items-center text-text-secondary">
    <label className="font-fira font-bold">
  <AccountCircleIcon className="mr-2 cursor-pointer hover:scale-[1.2] transition-transform duration-300 hover:text-accent-blue  " />
  {requestedUser}</label>
  <DeleteForeverRoundedIcon onClick={()=>{handleOnDelete(deleteID)}} className="cursor-pointer hover:scale-[1.2] transition-transform duration-300 hover:text-accent-red" />
    
  </div>
  )
}

export default ChatHeader
