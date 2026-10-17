import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const success = await login("login", {
      email,
      password,
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

      {/* Login Form */}
      <form
        onSubmit={onSubmitHandler}
        className="
          w-[350px]
          max-w-full
          bg-[#e8eef7]
          text-[#243b5a]
          p-8
          flex flex-col gap-6
          rounded-3xl
          shadow-[10px_10px_20px_#c5ccd6,-10px_-10px_20px_#ffffff]
        "
      >

        <h2 className="font-semibold text-2xl text-[#243b5a]">
          Login
        </h2>

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

        {/* Login Button */}
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
          Login
        </button>

        {/* Signup */}
        <p className="text-sm text-[#8190a6] text-center">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="
              font-semibold
              text-[#6b93f7]
              cursor-pointer
              hover:text-[#4f7eea]
            "
          >
            Create account
          </span>
        </p>

      </form>
    </div>
  );
};

export default Login;