import React, { useContext, useState } from 'react';
import LeftSideBar from '../components/LeftSideBar'
import ChatContainer from '../components/ChatContainer'
import RightSideBar from '../components/RightSideBar'
import { ChatContext } from '../../context/ChatContext';

const HomePage = () => {

const {selectedUser} = useContext(ChatContext);
  return (
    <div className='w-full h-screen bg-[#e8eef7] sm:px-[8%] lg:px-[12%] xl:px-[15%] sm:py-[4%] lg:py-[5%] flex items-center justify-center'>
      <div
        className={`
          bg-[#e8eef7]
          w-full
          h-full
          overflow-hidden
          rounded-3xl
          relative
          grid
          grid-cols-1
          shadow-[12px_12px_25px_#c5ccd6,-12px_-12px_25px_#ffffff]
          ${selectedUser
            ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]'
            : 'md:grid-cols-2'
          }
        `}
      >
        <LeftSideBar />
        <ChatContainer />
        <RightSideBar/>
      </div>
    </div>
  )
}

export default HomePage