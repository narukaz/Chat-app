import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function Sidebar() {

  const [conversations, setConversations]= useState([
    {senderName: 'ramesh',
     lastMessage: "where are you",
     time: '12pm',
    },
    {senderName: 'pinkesh',
      lastMessage: "the best music ",
      time: '12pm',
    },
    {senderName: 'mukesh',
      lastMessage: "are you still alive?",
      time: '12pm',
    }
  ]);


  return (
    <div className='bg-primary-bg flex-[0.3] flex flex-col gap-[20px] px-6 py-4'>
    <div className='bg-tertiary-bg py-6 px-4 rounded-[20px] flex justify-between items-center text-text-secondary'>
        <AccountCircleIcon className='cursor-pointer'/>
        <div><AddCircleIcon className='cursor-pointer' /></div>
        
    </div>
    <div><input type="text" className='bg-tertiary-bg w-full py-3 px-4 rounded-[15px] font-fira text-[20px] text-text-secondary' placeholder='search'/></div>
    <div className= 'bg-tertiary-bg flex-1 rounded-[20px] py-6 px-4 flex flex-col gap-3'>
      {conversations.map((item,index)=> {
        return (
          <div id={index} className='bg-secondary-bg py-4 px-3 rounded-md text-text-secondary flex flex-col cursor-pointer'>
            <h1 className='font-fira font-semibold'>{item.senderName}</h1>
            <div className='flex justify-between'><h3 className='font-fira font-normal'>{item.lastMessage.slice(0,30)+"..."}</h3>
            <p className='font-fira font-thin self-end'>{item.time}</p></div>
          </div>
        )
      })}
    </div>
    </div>
  )
}

export default Sidebar
