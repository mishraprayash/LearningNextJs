/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function verifyEmailPage() {
  const [verified, setVerified] = useState(false);
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);

  const verifyEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", {token});
      if (response.data.success) {
        setVerified(true);
      }
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl">Verify Email</h1>
      <h2 className="text-1xl bg-blue-400 rounded py-2 px-3">
        {token ? `${token}` : "No Token"}
      </h2>
      {verified && (
        <div>
          <h2 className="text-1xl">Email verified</h2>
          <Link href="/login" className="btn bg-blue-300 py-2 px-3 m-2">Login</Link>
        </div>
      )}
      {error && (
      <div>
        <h2 className="text-2xl"> Invalid Token </h2>
      </div>
      )}
    </div>
  );
}
