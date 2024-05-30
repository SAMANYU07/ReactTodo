import React from 'react'
import TodoInp from './TodoInp'
import TodoDisplay from './TodoDisplay'
import Navbar from './Navbar'
import { useSelector } from 'react-redux'
import LoadingScreen from './LoadingScreen'

export default function MainPage() {
  const loading = useSelector(state => state.loading);
  // if (loading)
    // return <LoadingScreen/>
  return (
    <>
    <div>
      <Navbar/>
    </div>
    <div className='flex flex-col items-center mt-40'>
      <TodoInp/>
      <TodoDisplay/>
    </div>
    </>
  )
}
