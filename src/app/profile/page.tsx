/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function profilePage() {
  const router = useRouter();

  const onLogout = async () => {
    try {
      await fetch("/api/users/logout");
      console.log("Logged out");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
    }
  };

  const [id, setId] = React.useState('');
  const getUserDetails = async () => {
    try {
      const response = await fetch("/api/users/me");
      const userData = await response.json();
      // console.log(userData.data);
      setId(userData.data.username);
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col  items-center justify-center min-h-screen py-2">
      <h1 className="text-red-400 text-2xl">Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2 className="bg-green-300 hover:bg-green-500 text-white font-bolf py-2 px-4 rounded-full mt-4">{id===''?'Not Found':<Link href={`/profile/${id}`}>{id}</Link>}</h2>
      <button
        onClick={onLogout}
        id="logout"
        className="bg-red-300 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-full mt-4"
      >
        Logout
      </button>
      <button className="bg-red-300 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-full mt-4" onClick={getUserDetails}>
        GetUserInfo
      </button>
    </div>
  );
}
