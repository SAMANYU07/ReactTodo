import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import LoginPage from './components/LoginPage'
import { useDispatch, useSelector } from 'react-redux'
import MainPage from './components/MainPage'
import LoadingScreen from "../src/components/LoadingScreen";
import authService from './appwrite/auth'
// import './App.css'

function App() {
  const dispatch = useDispatch();
  const userLoggedIn = useSelector(state => state.userLoggedIn);
  const loading = useSelector(state => state.loading);
  useEffect(() => {
    window.addEventListener("beforeunload", () => {authService.logoutAccount()});
  }, [])
  if (!userLoggedIn)
  return <LoginPage/>
  // if (loading)
    // return <LoadingScreen/>

  return (
    <>
      <MainPage/>
    </>
  )
}

export default App
