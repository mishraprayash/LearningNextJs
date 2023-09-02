/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast/headless";

export default function signupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setbuttonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      if (!(user.email && user.password && user.password)) {
        toast.error("Please fill in all fields");
        setLoading(false);
        return;
      }
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      if(response.ok){
        const data = await response.json();
        router.push('/login')
      }else{
        const error = await response.json();
        console.log(error);
        toast.error(error.message)
      }
    } catch (error: any) {
      console.log("SignUp failed: ", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setbuttonDisabled(false);
    } else {
      setbuttonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-whitesmoke-200">
      <h1 className="text-blue-900	text-2xl mb-4">
        {loading ? "Loading..." : "SignUp"}
      </h1>
      <hr />
      <label htmlFor="username" className="mt-4">
        Username
      </label>
      <input
        className="p-2 rounded-lg mt-4"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      ></input>
      <label htmlFor="email" className="mt-4">
        Email
      </label>
      <input
        className="p-2 rounded-lg mt-4"
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      ></input>
      <label htmlFor="password" className="mt-4">
        Password
      </label>
      <input
        className="p-2 rounded-lg mt-4"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      ></input>
      <button
        onClick={onSignup}
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4"
      >
        {buttonDisabled ? "No SignUp" : "SignUp"}
      </button>
      <Link
        href="/login"
        className=" bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full mt-4"
      >
        Login
      </Link>
    </div>
  );
}
