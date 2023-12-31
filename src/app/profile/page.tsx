/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ProfilePage() {
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
  const [username, setUsername] = useState("");
  // get user details from a database
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        // get request to a api to fetch userinfo
        const response = await fetch("/api/users/me");
        const userData = await response.json();
        setUsername(userData.data.username);

  
      } catch (error: any) {
        console.log("Error from here", error.message);
      }
    };
    getUserDetails();
  }, []);
  console.log(username);
  return (
    <div className="flex flex-col  items-center justify-center min-h-screen py-2">
      <h1 className="text-red-400 text-2xl">Profile</h1>
      { username ?
        (<h2 className="bg-green-500 text-white font-bolf py-2 px-4 mt-4 rounded"> Hi {username}</h2>):
        (<p>Loading....</p>)
      }
      <Link href={`/profile/${username}`} 
        className="btn bg-blue-300 p-2 m-2 rounded-lg"
      >
        GetAllDetails
      </Link>

      <button
        onClick={onLogout}
        id="logout"
        className="bg-red-300 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-full"
      >
        Logout
      </button>
    </div>
  );
}
