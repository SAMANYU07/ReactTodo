import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTask, showAll, updateUserNameID } from '../features/todoSlice';
import { ID } from 'appwrite';
import authService from '../appwrite/auth';

export default function TodoInp() {
  const [task1, setTask1] = useState("");
  const dispatch = useDispatch();
  const todoList = useSelector(state => state.todoList);
  const userName = useSelector(state => state.userName);
  const userID = useSelector(state => state.userID);
  const handleAddTodo = () => {
    task1 && dispatch(addTask({uid: ID.unique(), Task: task1, userid: userID}));
    setTask1("");
  }
  const handleshowAll = () => {
    console.log(todoList);
  }
  const disdet = () => {
    console.log(userName, userID);
  }
  // useEffect(() => {
  //   updateUser();
  // }, [])

  return (
    <>
    <div className=' bg-slate-200 md:w-[800px] w-11/12 h-[60px] flex items-center justify-center shadow-[0_0_10px_0_gray] rounded-lg'>
      <input type="text" value={task1} onChange={(event) => setTask1(event.target.value)} className=' md:w-[600px] w-11/12 outline-none text-[20px] pl-2 ml-2 rounded-md' />
      <button onClick={handleAddTodo} className=' w-[30px] h-[30px] ml-4 md:mr-0 mr-4 rounded-full bg-violet-600 text-white hover:scale-105 active:scale-95 outline-none transition-[0.2s]'>+</button>
    </div>
    </>
  )
}
