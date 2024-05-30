import React, { useState } from 'react'
import { addTask, clearAllTodos, isloggedin, login, preloadData, registerAccount, toggleLoading, toggleLoggedinStatus, updateUserNameID } from '../features/todoSlice';
import { useSelector, useDispatch } from "react-redux";
import authService from '../appwrite/auth';
import todoService from '../appwrite/todoConfig';
import LoadingScreen from './LoadingScreen';

export default function LoginPage() {
  const [haveAccount, setHaveAccount] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const userID = useSelector(state => state.userID);
  const userName = useSelector(state => state.userName);
  const loading = useSelector(state => state.loading);
  const dispatch = useDispatch();

  const handleRegister = () => {
    authService.accountCreation({email, pass, name})
    .then(data => {
      if (data !== -1)
        setHaveAccount(true);
    });
  }
  const listSessions = () => {
    const p = authService.activeUserSession();
    console.log(p);
    // authService.activeUserSession();
  }
  const handleLogin = () => {
    // dispatch(login({email, pass}));
    dispatch(toggleLoading(true));
    authService.loginAccount({email, pass})
    .then(data => {
      if (data !== -1) {
        dispatch(toggleLoggedinStatus(true));
        authService.activeUserSession()
        .then(data => {
          dispatch(updateUserNameID({id: data.$id, name: data.name}));
          dispatch(clearAllTodos());
          todoService.getAllTodos()
          .then(res => {
            res.documents.map(todo => {
              if (todo.userid === data.$id)
                dispatch(preloadData({userid: todo.userid, Task: todo.Task, uid: todo.uid}));
            })
          });
        });
      }
      dispatch(toggleLoading(false));
    });
  }
  const handleLogout = () => {
    authService.logoutAccount();
    dispatch(toggleLoggedinStatus(false));
  }
  const handlelon = () => {
    dispatch(isloggedin());
  }
  const displayuser = () => {
    console.log(authService.activeUserSession());
  }
  if (loading)
    return <LoadingScreen/>

  return (
    <>
    {/* <span onClick={listSessions} className=' cursor-pointer'>list</span> */}
    {/* <button onClick={handleLogout}>logout</button> */}
      {!haveAccount ?
        <div className=' w-[400px] h-[400px] flex flex-col items-center absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-slate-200 rounded-lg shadow-[0_0_10px_0px_gray]'>
          <h1 className='text-[30px] mt-6'>Register</h1>
          <input type="text" placeholder='Name' value={name} onChange={(event) => setName(event.target.value)} className=' mt-5 h-[40px] rounded-md pl-4 pr-4 text-[20px] outline-none focus:border-b-violet-600 border-2 transition-[0.2s]' />
          <input type="text" placeholder='Email' value={email} onChange={(event) => setEmail(event.target.value)} className=' mt-5 h-[40px] rounded-md pl-4 pr-4 text-[20px] outline-none focus:border-b-violet-600 border-2 transition-[0.2s]' />
          <input type="password" placeholder='Password' value={pass} onChange={(event) => setPass(event.target.value)} className=' mt-5 h-[40px] rounded-md pl-4 pr-4 text-[20px] outline-none focus:border-b-violet-600 border-2 transition-[0.2s]' />
          <button className=' mt-6 h-[40px] w-[100px] rounded-lg bg-violet-600 text-white hover:scale-105 active:scale-95 transition-[0.2s]' onClick={handleRegister}>Register</button>
          <div className='mt-6'>
            <span className=''>Don't have an account?</span> <span className=' cursor-pointer text-violet-800' onClick={() => setHaveAccount(true)}>Login</span>
          </div>
        </div>
        :
        <div className=' w-[400px] h-[400px] flex flex-col items-center absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-slate-200 rounded-lg shadow-[0_0_10px_0px_gray]'>
          <h1 className='text-[30px] mt-6'>Login</h1>
          <input type="text" placeholder='Email' value={email} onChange={(event) => setEmail(event.target.value)} className=' mt-5 h-[40px] rounded-md pl-4 pr-4 text-[20px] outline-none focus:border-b-violet-600 border-2 transition-[0.2s]' />
          <input type="password" placeholder='Password' value={pass} onChange={(event) => setPass(event.target.value)} className=' mt-5 h-[40px] rounded-md pl-4 pr-4 text-[20px] outline-none focus:border-b-violet-600 border-2 transition-[0.2s]' />
          <button className=' mt-6 h-[40px] w-[100px] rounded-lg bg-violet-600 text-white hover:scale-105 active:scale-95 transition-[0.2s]' onClick={handleLogin}>Login</button>
          <div className='mt-6'>
            <span className=''>Don't have an account?</span> <span className=' cursor-pointer text-violet-800' onClick={() => setHaveAccount(false)}>Register</span>
          </div>
        </div>
      }
    </>
  )
}
