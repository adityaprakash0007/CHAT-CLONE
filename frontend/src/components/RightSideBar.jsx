import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'

const RightSideBar = () => {

  const { selectedUser, messages, onlineUsers } = useContext(ChatContext);
  const { logout } = useContext(AuthContext);

  const [msgImages, setMsgImages] = useState([]);

  useEffect(() => {
    setMsgImages(
      messages
        .filter(msg => msg.image)
        .map(msg => msg.image)
    );
  }, [messages]);

  return selectedUser && (
    <div
      className={`bg-[#e8eef7] text-[#243b5a] w-full relative overflow-y-auto ${
        selectedUser ? "max-md:hidden" : ""
      }`}
    >

      {/* Profile Section */}
      <div className='pt-16 flex flex-col items-center gap-3 text-xs font-light mx-auto px-5'>

        {/* Profile Image */}
        <div className='p-2 rounded-full bg-[#e8eef7] shadow-[6px_6px_12px_#c5ccd6,-6px_-6px_12px_#ffffff]'>
          <img
            src={selectedUser?.profilePic || assets.avatar_icon}
            alt=''
            className='w-20 aspect-square rounded-full object-cover'
          />
        </div>

        {/* Name */}
        <h1 className='text-xl font-medium flex items-center gap-2 text-[#243b5a]'>

          {onlineUsers?.includes(selectedUser._id) && (
            <p className='w-2 h-2 rounded-full bg-green-500'></p>
          )}

          {selectedUser?.fullName}

        </h1>

        {/* Bio */}
        <p className='text-center text-[#8190a6] max-w-[250px]'>
          {selectedUser?.bio}
        </p>

      </div>

      {/* Divider */}
      <hr className='border-0 h-px bg-[#d2d9e3] my-5 mx-5' />

      {/* Media Section */}
      <div className='px-5 text-xs'>

        <p className='font-semibold text-[#334a68]'>
          Media
        </p>

        <div className='mt-3 max-h-[200px] overflow-y-auto grid grid-cols-2 gap-4 pr-1'>

          {msgImages.map((url, index) => (
            <div
              key={index}
              onClick={() => window.open(url)}
              className='cursor-pointer p-2 rounded-xl bg-[#e8eef7] shadow-[4px_4px_8px_#c5ccd6,-4px_-4px_8px_#ffffff] hover:shadow-[inset_4px_4px_8px_#c5ccd6,inset_-4px_-4px_8px_#ffffff] transition-all'
            >

              <img
                src={url}
                alt=''
                className='w-full h-full object-cover rounded-lg'
              />

            </div>
          ))}

        </div>

      </div>

      {/* Logout Button */}
      <button
        onClick={() => logout()}
        className='absolute bottom-5 left-1/2 -translate-x-1/2
        bg-[#e8eef7]
        text-[#6b93f7]
        font-semibold
        py-3 px-20
        cursor-pointer
        rounded-full
        shadow-[6px_6px_12px_#c5ccd6,-6px_-6px_12px_#ffffff]
        hover:shadow-[inset_5px_5px_10px_#c5ccd6,inset_-5px_-5px_10px_#ffffff]
        transition-all duration-200'
      >
        Logout
      </button>

    </div>
  )
}
export default RightSideBar
