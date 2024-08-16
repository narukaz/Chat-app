import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Signin from './components/login/Signin'
import Reset from './components/password/Reset'
import Home from './components/home/Home'
import Chatbox from './components/chatbox/chatbox'
import Welcome from './components/welcome/Welcome'
import Signup from './components/signup/Signup'

function App() {

  

  return (
    <div className='p-8 w-full h-screen bg-tertiary-bg'>
    <Routes>
      <Route path='/' element={<Signin/>}/>
      <Route path='reset-password' element={<Reset/>}/>
      <Route path='sign-up' element = {<Signup/>}/>
      <Route path='home' element={<Home/>}>
       <Route index element={<Welcome/>}/> 
       <Route path='welcome' element={<Welcome/>}/>  
       <Route path='chat' element={<Chatbox/>}/>      
      </Route>
    </Routes>            
    </div>
  )
}

export default App
