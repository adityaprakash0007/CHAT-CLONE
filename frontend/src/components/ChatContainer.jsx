import React, { useContext, useEffect, useRef, useState } from 'react'
import assets from '../assets/assets'
import { formatMessageTime } from '../lib/utils'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import toast from 'react-hot-toast'

const ChatContainer = () => {
  const {
    messages,
    selectedUser,
    setSelectedUser,
    sendMessage,
    getMessages
  } = useContext(ChatContext)

  const { authUser, onlineUsers } = useContext(AuthContext)

  const scrollEnd = useRef()
  const [input, setInput] = useState('')

  const handleSendMessage = async (e) => {
    e.preventDefault()

    if (input.trim() === '') return null

    await sendMessage({ text: input.trim() })
    setInput('')
  }

  const handleSendImage = async (e) => {
    const file = e.target.files[0]

    if (!file || !file.type.startsWith('image/')) {
      toast.error('Select an image file')
      return
    }

    const reader = new FileReader()

    reader.onloadend = async () => {
      await sendMessage({ image: reader.result })
      e.target.value = ''
    }

    reader.readAsDataURL(file)
  }

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id)
    }
  }, [selectedUser])

  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return selectedUser ? (
    <div className="h-full relative overflow-hidden bg-[#e8eef7] text-[#243b5a]">

      {/* ================= HEADER ================= */}
      <div className="mx-4 mt-4 px-5 py-3 rounded-2xl
                      bg-[#e8eef7]
                      shadow-[6px_6px_12px_#c5ccd6,-6px_-6px_12px_#ffffff]
                      flex items-center gap-3">

        {/* Back button - Mobile */}
        <button
          onClick={() => setSelectedUser(null)}
          className="md:hidden w-10 h-10 rounded-xl
                     bg-[#e8eef7]
                     shadow-[4px_4px_8px_#c5ccd6,-4px_-4px_8px_#ffffff]
                     flex items-center justify-center
                     active:shadow-[inset_3px_3px_6px_#c5ccd6,inset_-3px_-3px_6px_#ffffff]"
        >
          <img
            src={assets.arrow_icon}
            alt=""
            className="w-5 brightness-0 opacity-60"
          />
        </button>

        {/* Profile Picture */}
        <div className="w-11 h-11 rounded-full p-[2px]
                        shadow-[4px_4px_8px_#c5ccd6,-4px_-4px_8px_#ffffff]">
          <img
            src={selectedUser.profilePic || assets.avatar_icon}
            alt=""
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        {/* User Info */}
        <div className="flex-1">
          <p className="font-semibold text-[16px]">
            {selectedUser.fullName}
          </p>

          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                onlineUsers.includes(selectedUser._id)
                  ? 'bg-green-500' 
                  : 'bg-gray-400'
              }`}
            ></span>

            <span className="text-xs text-[#71829b]">
              {onlineUsers.includes(selectedUser._id)
                ? 'Online'
                : 'Offline'}
            </span>
          </div>
        </div>

        {/* Help */}
        <button
          className="max-md:hidden w-10 h-10 rounded-xl
                     bg-[#e8eef7]
                     shadow-[4px_4px_8px_#c5ccd6,-4px_-4px_8px_#ffffff]
                     flex items-center justify-center
                     active:shadow-[inset_3px_3px_6px_#c5ccd6,inset_-3px_-3px_6px_#ffffff]"
        >
          <img
            src={assets.help_icon}
            alt=""
            className="w-5 brightness-0 opacity-50"
          />
        </button>
      </div>


      {/* ================= CHAT AREA ================= */}
      <div
        className="flex flex-col h-[calc(100%-145px)]
                   overflow-y-auto px-5 py-5 pb-8
                   scrollbar-thin scrollbar-thumb-[#c5ccd6]"
      >

        {messages.map((msg, index) => {

          const isSender = msg.senderId === authUser._id

          return (
            <div
              key={index}
              className={`flex items-end gap-3 mb-5 ${
                isSender ? 'justify-end' : 'justify-start'
              }`}
            >

              {/* Message */}
              {msg.image ? (

                <div
                  className={`rounded-2xl p-2
                    bg-[#e8eef7]
                    shadow-[6px_6px_12px_#c5ccd6,-6px_-6px_12px_#ffffff]
                    ${isSender
                      ? 'rounded-br-md'
                      : 'rounded-bl-md'
                    }`}
                >
                  <img
                    src={msg.image}
                    alt=""
                    className="max-w-[230px] rounded-xl object-cover"
                  />
                </div>

              ) : (

                <p
                  className={`px-4 py-3 max-w-[65%] md:max-w-[55%]
                    text-sm leading-5 break-words
                    ${
                      isSender
                        ? `bg-[#6b93f7] text-white
                           rounded-2xl rounded-br-md
                           shadow-[5px_5px_10px_#b8c1d0,-4px_-4px_10px_#ffffff]`
                        : `bg-[#e8eef7] text-[#334a68]
                           rounded-2xl rounded-bl-md
                           shadow-[5px_5px_10px_#c5ccd6,-5px_-5px_10px_#ffffff]`
                    }`}
                >
                  {msg.text}
                </p>

              )}

              {/* Avatar + Time */}
              <div className="flex flex-col items-center gap-1 min-w-[40px]">

                <div
                  className="w-8 h-8 rounded-full p-[2px]
                             bg-[#e8eef7]
                             shadow-[3px_3px_7px_#c5ccd6,-3px_-3px_7px_#ffffff]"
                >
                  <img
                    src={
                      isSender
                        ? authUser?.profilePic || assets.avatar_icon
                        : selectedUser?.profilePic || assets.avatar_icon
                    }
                    alt=""
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>

                <p className="text-[10px] text-[#8291a8] whitespace-nowrap">
                  {formatMessageTime(msg.createdAt)}
                </p>

              </div>

            </div>
          )
        })}

        <div ref={scrollEnd}></div>

      </div>


      {/* ================= MESSAGE INPUT ================= */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">

        <div className="flex items-center gap-3">

          {/* Input container */}
          <div
            className="flex-1 flex items-center
                       px-4 py-2 rounded-2xl
                       bg-[#e8eef7]
                       shadow-[inset_5px_5px_10px_#c5ccd6,inset_-5px_-5px_10px_#ffffff]"
          >

            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              onKeyDown={(e) =>
                e.key === 'Enter' ? handleSendMessage(e) : null
              }
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-transparent
                         border-none outline-none
                         text-[#334a68]
                         placeholder-[#8a98ad]
                         text-sm md:text-base
                         py-2"
            />

            {/* Image Upload */}
            <input
              onChange={handleSendImage}
              type="file"
              id="image"
              accept="image/jpg, image/jpeg, image/png"
              hidden
            />

            <label
              htmlFor="image"
              className="w-10 h-10 rounded-xl
                         flex items-center justify-center
                         cursor-pointer
                         bg-[#e8eef7]
                         shadow-[3px_3px_7px_#c5ccd6,-3px_-3px_7px_#ffffff]
                         active:shadow-[inset_3px_3px_6px_#c5ccd6,inset_-3px_-3px_6px_#ffffff]"
            >
              <img
                src={assets.gallery_icon}
                alt=""
                className="w-5 brightness-0 opacity-50"
              />
            </label>

          </div>


          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            className="w-12 h-12 md:w-14 md:h-14
                       rounded-full
                       bg-[#6b93f7]
                       flex items-center justify-center
                       shadow-[6px_6px_12px_#c0c8d5,-5px_-5px_10px_#ffffff]
                       active:shadow-[inset_4px_4px_8px_#557bd6,inset_-4px_-4px_8px_#8babff]
                       transition-all duration-150"
          >
            <img
              src={assets.send_button}
              alt="send"
              className="w-6 md:w-7"
            />
          </button>

        </div>

      </div>

    </div>

  ) : (

    /* ================= EMPTY CHAT ================= */
    <div
      className="h-full flex flex-col items-center justify-center
                 gap-4 bg-[#e8eef7] text-[#5e718d]"
    >

      <div
        className="w-24 h-24 rounded-full
                   bg-[#e8eef7]
                   flex items-center justify-center
                   shadow-[8px_8px_16px_#c5ccd6,-8px_-8px_16px_#ffffff]"
      >
        <img
          src={assets.logo}
          alt=""
          className="max-w-12"
        />
      </div>

      <div className="text-center">

        <p className="font-semibold text-[#334a68] text-lg">
          Welcome to ChatConnect
        </p>

        <p className="text-sm text-[#8190a6] mt-1">
          Chat anytime, anywhere
        </p>

      </div>

    </div>
  )
}

export default ChatContainer