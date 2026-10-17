import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'

const LeftSideBar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages
  } = useContext(ChatContext)

  const { logout, onlineUsers } = useContext(AuthContext)

  const [input, setInput] = useState("")
  const navigate = useNavigate()

  const filteredUsers = input
    ? users.filter((user) =>
        user.fullName.toLowerCase().includes(input.toLowerCase())
      )
    : users

  useEffect(() => {
    getUsers()
  }, [onlineUsers])

  return (
    <div
      className={`
        h-full
        p-5
        bg-[#e8eef7]
        text-[#243b5a]
        rounded-r-3xl
        overflow-hidden
        flex flex-col
        ${selectedUser ? "max-md:hidden" : ""}
      `}
    >

      {/* ================= TOP SECTION ================= */}
      <div className="pb-5 flex-shrink-0">

        {/* Logo + Menu */}
        <div className="flex justify-between items-center">

          <img
            src={assets.logo}
            alt="logo"
            className="max-w-36 object-contain"
          />

          <div className="relative group">

            {/* Menu Button */}
            <button
              className="
                w-10 h-10
                rounded-xl
                bg-[#e8eef7]
                flex items-center justify-center
                shadow-[4px_4px_8px_#c5ccd6,-4px_-4px_8px_#ffffff]
                active:shadow-[inset_3px_3px_6px_#c5ccd6,inset_-3px_-3px_6px_#ffffff]
                transition-all duration-150
              "
            >
              <img
                src={assets.menu_icon}
                alt="Menu"
                className="w-5 brightness-0 opacity-50"
              />
            </button>

            {/* Dropdown */}
            <div
              className="
                absolute
                top-12
                right-0
                z-30
                w-40
                p-3
                rounded-2xl
                bg-[#e8eef7]
                shadow-[7px_7px_15px_#c5ccd6,-7px_-7px_15px_#ffffff]
                hidden
                group-hover:block
              "
            >

              <p
                onClick={() => navigate('/profile')}
                className="
                  px-3 py-2
                  rounded-xl
                  text-sm
                  text-[#3c506d]
                  cursor-pointer
                  hover:bg-[#dde5f0]
                "
              >
                Edit profile
              </p>

              <hr className="my-2 border-[#d1d8e2]" />

              <p
                onClick={logout}
                className="
                  px-3 py-2
                  rounded-xl
                  text-sm
                  text-[#3c506d]
                  cursor-pointer
                  hover:bg-[#dde5f0]
                "
              >
                Logout
              </p>

            </div>

          </div>

        </div>


        {/* ================= SEARCH ================= */}
        <div
          className="
            mt-6
            flex items-center gap-3
            px-4 py-3
            rounded-2xl
            bg-[#e8eef7]
            shadow-[inset_5px_5px_10px_#c5ccd6,inset_-5px_-5px_10px_#ffffff]
          "
        >

          <img
            src={assets.search_icon}
            alt="search"
            className="w-4 brightness-0 opacity-45"
          />

          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Search user"
            className="
              flex-1
              bg-transparent
              border-none
              outline-none
              text-[#334a68]
              text-sm
              placeholder-[#8795a9]
            "
          />

        </div>

      </div>


      {/* ================= USERS - ONLY THIS SECTION SCROLLS ================= */}
      <div
        className="
          space-y-3
          flex-1
          overflow-y-auto
          pr-2
          pb-2
        "
      >

        {filteredUsers.map((user) => {

          const isSelected = selectedUser?._id === user._id
          const isOnline = onlineUsers.includes(user._id)
          const unseenCount = unseenMessages[user._id] || 0

          return (
            <div
              key={user._id}
              onClick={() => {
                setSelectedUser(user)

                setUnseenMessages(prev => ({
                  ...prev,
                  [user._id]: 0
                }))
              }}
              className={`
                relative
                flex items-center gap-3
                p-3
                rounded-2xl
                cursor-pointer
                transition-all duration-200

                ${
                  isSelected
                    ? `
                      bg-[#e8eef7]
                      shadow-[inset_4px_4px_8px_#c5ccd6,inset_-4px_-4px_8px_#ffffff]
                    `
                    : `
                      bg-[#e8eef7]
                      shadow-[5px_5px_10px_#c5ccd6,-5px_-5px_10px_#ffffff]
                      hover:translate-y-[-1px]
                    `
                }
              `}
            >

              {/* Profile Picture */}
              <div
                className="
                  w-11 h-11
                  rounded-full
                  p-[2px]
                  bg-[#e8eef7]
                  shadow-[3px_3px_7px_#c5ccd6,-3px_-3px_7px_#ffffff]
                  flex-shrink-0
                "
              >
                <img
                  src={user?.profilePic || assets.avatar_icon}
                  alt=""
                  className="w-full h-full rounded-full object-cover"
                />
              </div>


              {/* User Info */}
              <div className="flex flex-col leading-5 min-w-0">

                <p
                  className="
                    font-semibold
                    text-sm
                    text-[#304766]
                    truncate
                  "
                >
                  {user.fullName}
                </p>

                <div className="flex items-center gap-2">

                  <span
                    className={`
                      w-2 h-2
                      rounded-full
                      ${
                        isOnline
                          ? 'bg-green-500 shadow-[0_0_5px_#22c55e]'
                          : 'bg-gray-400'
                      }
                    `}
                  ></span>

                  <span
                    className={`
                      text-xs
                      ${
                        isOnline
                          ? 'text-green-600'
                          : 'text-[#8996a9]'
                      }
                    `}
                  >
                    {isOnline ? 'Online' : 'Offline'}
                  </span>

                </div>

              </div>


              {/* Unseen Messages */}
              {unseenCount > 0 && (
                <div
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    w-6 h-6
                    rounded-full
                    bg-[#6b93f7]
                    text-white
                    text-xs
                    font-semibold
                    flex items-center justify-center
                    shadow-[3px_3px_6px_#c5ccd6,-2px_-2px_5px_#ffffff]
                  "
                >
                  {unseenCount}
                </div>
              )}

            </div>
          )
        })}

      </div>

    </div>
  )
}

export default LeftSideBar