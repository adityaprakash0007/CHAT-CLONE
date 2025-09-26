import { useContext, useState } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import {Toaster} from "react-hot-toast"
import { AuthContext } from '../context/AuthContext';

function App() {
 const { authUser } = useContext(AuthContext);
  return (
    <>
      <div className=" w-full h-screen bg-[url('./src/assets/bgImage.svg')] bg-contain">
        <Toaster/>
        <Routes>
          <Route path ='/' element={<HomePage/>}/>
          <Route path ='/login' element={<LoginPage/> }/>
          <Route path ='/profile' element={<ProfilePage/> }/>

        </Routes>
      </div>
    </>
  )
}

export default App
