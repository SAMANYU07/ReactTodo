import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import authService from '../appwrite/auth';
import { clearAllTodos, toggleLoggedinStatus } from '../features/todoSlice';

export default function Navbar() {
  const userName = useSelector(state => state.userName);
  const dispatch = useDispatch();
  console.log("env: ", import.meta.env.VITE_APPWRITE_URL);
  
  const handleLogout = () => {
    authService.logoutAccount();
    dispatch(toggleLoggedinStatus(false));
    dispatch(clearAllTodos());
  }
  return (
    <>
    <div className=' h-[60px] bg-slate-200 flex items-center fixed top-0 w-full shadow-[0_0_10px_0_gray]'>
      <span className=' mt-1 inline-block ml-1 font-bold text-[20px]'>Welcome, {userName}</span>
      <button onClick={handleLogout} className=' ml-auto mr-4 bg-violet-600 w-[80px] h-[30px] rounded-lg text-white hover:scale-105'>Logout</button>
    </div>
    </>
  )
}
