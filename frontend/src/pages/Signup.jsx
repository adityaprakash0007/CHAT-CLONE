import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const success = await login("signup", {
      fullName,
      email,
      password,
      bio,
    });

    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#e8eef7] flex items-center justify-center gap-12 sm:justify-evenly max-sm:flex-col p-5">

      {/* Logo */}
      <div
        className="
          p-6
          rounded-3xl
          bg-[#e8eef7]
          shadow-[10px_10px_20px_#c5ccd6,-10px_-10px_20px_#ffffff]
          max-sm:mb-5
        "
      >
        <img
          src={assets.logo}
          alt="Logo"
          className="w-[min(30vw,250px)] max-sm:w-[180px]"
        />
      </div>

      {/* Signup Form */}
      <form
        onSubmit={onSubmitHandler}
        className="
          w-[350px]
          max-w-full
          bg-[#e8eef7]
          text-[#243b5a]
          p-8
          flex flex-col gap-5
          rounded-3xl
          shadow-[10px_10px_20px_#c5ccd6,-10px_-10px_20px_#ffffff]
        "
      >

        <h2 className="font-semibold text-2xl text-[#243b5a]">
          Create Account
        </h2>

        {/* Full Name */}
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="
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

        {/* Email */}
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="
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

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="
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
          rows={4}
          placeholder="Provide a short bio..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          required
          className="
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

        {/* Privacy Checkbox */}
        <label className="flex items-center gap-3 text-sm text-[#8190a6] cursor-pointer">
          <input
            type="checkbox"
            required
            className="
              w-4
              h-4
              accent-[#6b93f7]
              cursor-pointer
            "
          />

          <p>
            Agree to the use & privacy policy.
          </p>
        </label>

        {/* Create Account Button */}
        <button
          type="submit"
          className="
            py-3
            bg-[#e8eef7]
            text-[#6b93f7]
            font-semibold
            rounded-full
            cursor-pointer
            shadow-[6px_6px_12px_#c5ccd6,-6px_-6px_12px_#ffffff]
            hover:shadow-[inset_5px_5px_10px_#c5ccd6,inset_-5px_-5px_10px_#ffffff]
            transition-all duration-200
          "
        >
          Create Account
        </button>

        {/* Login Link */}
        <p className="text-sm text-[#8190a6] text-center">
          Already have an account?{" "}

          <span
            onClick={() => navigate("/login")}
            className="
              font-semibold
              text-[#6b93f7]
              cursor-pointer
              hover:text-[#4f7eea]
            "
          >
            Login here
          </span>
        </p>

      </form>
    </div>
  );
};

export default Signup;