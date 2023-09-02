/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function loginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setbuttonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      if (!(user.email && user.password)) {
        return new Error("Please fill in the email and password");
        setLoading(false);
      }
      const response = await fetch("api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if(response.ok) {
        const data = await response.json();
        if(data.success){
            router.push('/profile');
        }
      }
      else{
        const error = await response.json();
        console.log(error);
        
      }
    } catch (error: any) {
      console.log("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setbuttonDisabled(false);
    } else {
      setbuttonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-blue-900	text-2xl mb-4">
        {loading ? "Processing.." : "Login"}
      </h1>
      <hr />
      <label htmlFor="email" className="">
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
        onClick={onLogin}
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4"
      >
        Login
      </button>
      <Link
        href="/signup"
        className="bg-gray-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full mt-4"
      >
        SignUp
      </Link>
    </div>
  );
}
