import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

function Home() {
  return (
    <div className='bg-primary-bg w-full h-full rounded-xl flex overflow-hidden'>
      <Sidebar/>
      <Outlet/>
    </div>
  )
}

export default Home
