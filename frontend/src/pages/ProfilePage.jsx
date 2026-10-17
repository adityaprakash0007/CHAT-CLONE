import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import assets from "../assets/assets";

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);

  const [selectedImg, setSelectedImg] = useState(null);
  const [name, setName] = useState(authUser?.fullName || "");
  const [bio, setBio] = useState(authUser?.bio || "");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImg) {
      const ok = await updateProfile({ fullName: name, bio });

      if (ok) navigate("/");
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(selectedImg);

    reader.onload = async () => {
      const ok = await updateProfile({
        profilePic: reader.result,
        fullName: name,
        bio,
      });

      if (ok) navigate("/");
    };
  };

  return (
    <div className="min-h-screen bg-[#e8eef7] flex items-center justify-center p-5">

      <div
        className="
          w-5/6 max-w-2xl
          bg-[#e8eef7]
          text-[#243b5a]
          flex items-center justify-between
          max-sm:flex-col-reverse
          rounded-3xl
          p-3
          shadow-[10px_10px_20px_#c5ccd6,-10px_-10px_20px_#ffffff]
        "
      >

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 gap-6 p-8 sm:p-10"
        >

          <h3 className="text-xl font-semibold text-[#243b5a]">
            Profile details
          </h3>

          {/* Profile Image Upload */}
          <label
            htmlFor="avatar"
            className="
              flex items-center gap-4
              cursor-pointer
              text-sm font-medium
              text-[#8190a6]
            "
          >
            <input
              onChange={(e) => setSelectedImg(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".jpeg, .png, .jpg"
              hidden
            />

            <div
              className="
                p-1
                rounded-full
                bg-[#e8eef7]
                shadow-[5px_5px_10px_#c5ccd6,-5px_-5px_10px_#ffffff]
              "
            >
              <img
                src={
                  selectedImg
                    ? URL.createObjectURL(selectedImg)
                    : authUser?.profilePic || assets.avatar_icon
                }
                alt=""
                className="w-14 h-14 rounded-full object-cover"
              />
            </div>

            <span className="hover:text-[#6b93f7] transition">
              Upload profile image
            </span>
          </label>

          {/* Name */}
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            required
            placeholder="Your name"
            className="
              w-full
              p-4
              bg-[#e8eef7]
              text-[#243b5a]
              placeholder-[#9aa7b8]
              rounded-2xl
              border-none
              outline-none
              shadow-[inset_5px_5px_10px_#c5ccd6,inset_-5px_-5px_10px_#ffffff]
              focus:shadow-[inset_6px_6px_12px_#c5ccd6,inset_-6px_-6px_12px_#ffffff]
            "
          />

          {/* Bio */}
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder="Write profile bio"
            required
            rows={4}
            className="
              w-full
              p-4
              bg-[#e8eef7]
              text-[#243b5a]
              placeholder-[#9aa7b8]
              rounded-2xl
              border-none
              outline-none
              resize-none
              shadow-[inset_5px_5px_10px_#c5ccd6,inset_-5px_-5px_10px_#ffffff]
              focus:shadow-[inset_6px_6px_12px_#c5ccd6,inset_-6px_-6px_12px_#ffffff]
            "
          />

          {/* Save Button */}
          <button
            type="submit"
            className="
              bg-[#e8eef7]
              text-[#6b93f7]
              font-semibold
              text-lg
              p-3
              rounded-full
              cursor-pointer
              shadow-[6px_6px_12px_#c5ccd6,-6px_-6px_12px_#ffffff]
              hover:shadow-[inset_5px_5px_10px_#c5ccd6,inset_-5px_-5px_10px_#ffffff]
              transition-all duration-200
            "
          >
            Save
          </button>

        </form>

        {/* Large Profile Image */}
        <div
          className="
            p-3
            rounded-full
            bg-[#e8eef7]
            shadow-[8px_8px_16px_#c5ccd6,-8px_-8px_16px_#ffffff]
            mx-10
            max-sm:mt-10
          "
        >
          <img
            className="w-44 aspect-square rounded-full object-cover"
            src={
              selectedImg
                ? URL.createObjectURL(selectedImg)
                : authUser?.profilePic || assets.logo_icon
            }
            alt=""
          />
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;