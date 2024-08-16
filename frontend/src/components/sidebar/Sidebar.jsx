import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function Sidebar() {




  return (
    <div className='bg-primary-bg flex-[0.3] flex flex-col gap-[20px] px-6 py-4'>
    <div className='bg-tertiary-bg py-6 px-4 rounded-[20px] flex justify-between items-center text-text-secondary'>
        <AccountCircleIcon className='cursor-pointer'/>
        <div><AddCircleIcon className='cursor-pointer' /></div>
        
    </div>
    <div><input type="text" className='bg-tertiary-bg w-full py-3 px-4 rounded-[15px] font-fira text-[20px] text-text-secondary' placeholder='search'/></div>
    <div className= 'bg-tertiary-bg flex-1 rounded-[20px] py-6 px-4'>
    </div>
    </div>
  )
}

export default Sidebar
