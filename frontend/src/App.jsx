import { useEffect, useState } from 'react'
import { Navigate, Route,Routes } from 'react-router-dom'
import {useAuthStore} from "./store/useAuthStore.js";
import {useThemeStore} from "./store/useThemeStore.js";

import Navbar from './components/Navbar.jsx'
import HomePage from "./pages/HomePage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"
import SettingsPage from "./pages/SettingsPage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"

import {Loader} from "lucide-react"

function App() {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers}=useAuthStore();

  const {theme}=useThemeStore();

  useEffect(()=>{
    checkAuth();
  },[checkAuth]);

  if(isCheckingAuth && !authUser){
    return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className='size-10 animate-spin'/>
    </div>
    );
  }
  return (
    <div data-theme={theme}>
      <Navbar/>

      <Routes>
        <Route path="/" element={authUser ? <HomePage/> :<Navigate to="/login"/>}/>
        <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to="/"/>}/>
        <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/"/>}/>
        <Route path="/settings" element={<SettingsPage/>}/>
        <Route path="/profile" element={authUser ? <ProfilePage/> :<Navigate to="/login"/>}/>
      </Routes>
    </div>
  )
}

export default App
