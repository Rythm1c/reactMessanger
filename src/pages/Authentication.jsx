import React, { useState } from "react";
import { signUp, login } from "../config/supabaseAuth.js";
import { useNavigate } from "react-router-dom";

function Authentication() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState(false);

  let nav = useNavigate();
  const auth = async () => {
    if (isSignUp)
      await signUp(userName, password);
    else
      await login(userName, password);

    let user = JSON.parse(window.localStorage.getItem("user"));
    if (user) {
      nav("/reactMessanger/ChatWindow");
    }
  };

  return (
    <div
      className={`flex min-h-screen items-center justify-center bg-gray-600 text-white`}>
      <div className="w-140 bg-gray-700 shadow-2xl p-1">
        <div>
          <div className=" text-center text-xl">
            {isSignUp ? "Sign Up" : "Login"}
          </div>
        </div>
        <div className="mt-4">
          <div className="space-y-10 flex flex-col items-center">
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={(e) => setUserName(e.target.value)}
              required
              className="bg-gray-800 border-none text-white rounded-[2px] p-1"
            />

            <div className="flex">
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-800 border-none text-white rounded-[2px] p-1"
              />
            </div>

            <button
              onClick={auth}
              className=" py-1 px-2 bg-blue-600 hover:bg-blue-700 rounded-[3px]"
            >
              {isSignUp ? "Sign Up" : "Login"}
            </button>
          </div>
          <p className="mt-4 text-center text-sm">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-400 hover:underline"
            >
              {isSignUp ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Authentication;
