import React from 'react'
import { useDispatch } from 'react-redux'
import { removeTodo } from '../features/todoSlice';

export default function TodoCard({todo}) {
  const dispatch = useDispatch();
  const handleRemoveTodo = () => {
    dispatch(removeTodo(todo.uid));
  }
  return (
    <>
    <div className='md:w-[660px] h-[36px] w-11/12 flex items-center mt-4 rounded-md bg-white animate-bounce anim1 duration-200 hover:scale-[102%]'>
      <span className=' ml-2'>{todo.Task}</span>
      <button onClick={handleRemoveTodo} className=' mr-4 ml-auto bg-violet-600 w-[27px] rounded-full text-white'>X</button>
    </div>
    </>
  )
}
