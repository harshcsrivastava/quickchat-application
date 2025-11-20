import React, { useContext, useState } from "react";
//ignore unused vars comment

import assets from "../assets/assets.js";
import { AuthContext } from "../../context/AuthContext.jsx";
const Login = () => {
  const [currState, setCurrState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [fullName, setFullName] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const {login} = useContext(AuthContext)

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (currState === "Sign Up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }

    login(currState === "Sign Up" ? "signup" : "login", {fullName, email, password, bio})
    
  };

  return (
    <div className="min-h-screen bg-center bg-cover flex justify-center items-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      {/* Left Side - Image */}
      <img src={assets.logo_big1} alt="" className="w-[min(30vw,250px)]" />

      {/* Right Side - Form */}
      <form
        onSubmit={onSubmitHandler}
        className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg"
      >
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {currState}
          {isDataSubmitted && (
            <img
              onClick={() => setIsDataSubmitted(false)}
              src={assets.arrow_icon}
              alt=""
              className="w-5 cursor-pointer"
            />
          )}
        </h2>
        {currState === "Sign Up" && !isDataSubmitted && (
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            className="p-2 border border-gray-500 rounded-md focus:outline-none"
            placeholder="Full Name"
            required
          />
        )}

        {!isDataSubmitted && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF3437]"
              placeholder="Email Address"
              required
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF3437]"
              placeholder="Password"
              required
            />
          </>
        )}

        {currState === "Sign Up" && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF3437]"
            placeholder="Provide a bio"
          ></textarea>
        )}

        <button
          type="submit"
          className="py-3 bg-gradient-to-r from-[#FF3437] to-[#B9061A] text-white rounded-md cursor-pointer"
        >
          {currState === "Sign Up" ? "Create Account" : "Login Now"}
        </button>

        {currState === "Sign Up" && (<div className="flex items-center gap-2 text-sm text-gray-500">
          <input type="checkbox" name="" id="" />
          <p>Agree to the terms and conditions</p>
        </div>)}

        <div className="flex flex-col text-sm">
          {currState === "Sign Up" ? (
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => {
                  setCurrState("Login");
                  setIsDataSubmitted(false);
                }}
                className="font-medium text-[#B9061A] cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <span
                onClick={() => {
                  setCurrState("Sign Up");
                }}
                className="font-medium text-[#B9061A] cursor-pointer"
              >
                Sign up
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
