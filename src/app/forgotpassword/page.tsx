"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Router from "next/navigation";

export default function forgotPassword() {
  const [email, setEmail] = useState("");
  const [buttonDisable, setButtonDisable] = useState(true);
  const [response, setResponse] = useState(false);
  const [message, setMessage] = useState("");

  const forgotPassword = async () => {
    try {
      const response = await axios.post("/api/users/forgotpassword", { email });
      if (response) {
        setResponse(true);
        console.log(response.data)
      }
    } catch (error: any) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    if (email.length > 0) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
    if (response) {
      setMessage("success");
    } else {
      setMessage("failure");
    }
  }, [email, response]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <label htmlFor="email" className="text-1xl">
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className="bg-cyan-300 rounded"
      />
      <button
        className="btn bg-blue-400 rounded py-2 px-3 mx-2 my-3"
        onClick={
          buttonDisable
            ? () => console.log("Please enter the valid email")
            : forgotPassword
        }
      >
        {buttonDisable ? "Give a valid email" : "Send Link to Email"}
      </button>
      {response ? (
        <h2 className="text-2xl bg-blue-300 rounded p-3 m-3">
          Email Sent Successfully
        </h2>
      ) : (
        ""
      )}
    </div>
  );
}
