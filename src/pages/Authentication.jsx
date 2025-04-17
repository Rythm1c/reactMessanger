import React, { useState, useEffect } from "react";
import { signUp, login } from "../config/supabaseAuth.js";
import { useNavigate } from "react-router-dom";
import supabase from "../config/SupabaseClient.js";

function Authentication() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(false);

  let nav = useNavigate();
  const auth = async () => {
    if (isSignUp) {
      await signUp(email, password);
    }
    else {
      await login(email, password);

      if (window.localStorage.getItem('user'))
        nav("/ChatWindow");
    }

  };

  useEffect(() => {
    supabase.auth.getUser().then(
      async ({ data: { user } }) => {
        if (user) {
          console.log(user);
          window.localStorage.setItem('user', JSON.stringify(user));
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          await supabase.from('users').insert({
            id: user.id,
            email: user.email,
            username: null
          });

          if (!profile) {
            nav("/customize");
          } else {
            nav("/ChatWindow");
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, []);

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
          <div className="space-y-5 flex flex-col items-center">
            <input
              type="email"
              name="name"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-800 border-none text-white rounded-[2px] p-1 " />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-gray-800 border-none text-white rounded-[2px] p-1" />

            <button
              onClick={auth}
              className=" py-1 px-2 bg-blue-600 hover:bg-blue-700 rounded-[3px]">
              {isSignUp ? "Sign Up" : "Login"}
            </button>
          </div>
          <p className="mt-4 text-center text-sm">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-400 hover:underline">
              {isSignUp ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Authentication;
