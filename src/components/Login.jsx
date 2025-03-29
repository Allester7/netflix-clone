import React, { useState } from "react";
import Header from "./Header";
const Login = () => {
    const[isSignInForm, setSignInForm]=useState(true);
    const handleSignClick = () => {
        setSignInForm(!isSignInForm);
    }
  return (
    <div className="relative w-full h-screen">
      <Header />
      <div className="absolute top-0 left-0 w-full h-full">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fbf440b2-24a0-49f5-b2ba-a5cbe8ea8736/web/IN-en-20250324-TRIFECTA-perspective_d7c906ec-0531-47de-8ece-470d5061c88a_small.jpg"
          alt="Background Image"
          className="w-full h-full object-cover"
        />
        <form className="absolute h-auto w-80 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/85 text-white p-8 opacity-90">
            <h4 className="font-bold text-center">{isSignInForm ? "Sign In":"Sign up"}</h4>
            {!isSignInForm ? <input 
            type="text" 
            name="username" 
            id="username" 
            placeholder="Username"
            className="my-4 p-2 w-full h-10 rounded-lg border-white bg-gray-700" 
        />: null}
          <input 
            type="text" 
            name="email" 
            id="email" 
            placeholder="Email"
            className="my-4 p-2 w-full h-10 rounded-lg border-white bg-gray-700" 
        />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="my-4 p-2 w-full h-10 rounded-lg border-white bg-gray-700"
          />
          <button className="bg-red-600 w-full h-10 rounded-lg my-3">
          {isSignInForm ? "Sign in": "Sign up"}
          </button>
          <p className="my-10">
          {isSignInForm ?
          <>
            New to Neflix? <span className="cursor-pointer text-blue-700" onClick={handleSignClick}>Sign Up</span> 
            </>:
            <>
            Already a user? <span className="cursor-pointer text-blue-700" onClick={handleSignClick}>Sign In</span>
            </>
          }
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
