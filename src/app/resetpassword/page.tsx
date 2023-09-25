"use client";
import { useState, useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";

export default function resetPassword() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [buttonDisable, setButtonDisable] = useState(true);
  const [token, setToken] = useState("");

  const changePassword = async () => {
    try {
      const response = await axios.post("/api/users/resetpassword", {
        confirmPassword,
        token
      });
      if (response) {
        router.push("/profile");
        console.log("Password Changed Successfully");
      }
    } catch (error: any) {
      console.log(error.response.data);
    }
  };
//  check if the password fields are correct or not.
  useEffect(() => {
    if (
      confirmPassword.length > 0 &&
      newPassword === confirmPassword 
    ) {
      setButtonDisable(false);
    }
    else{
        setButtonDisable(true);
    }
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, [newPassword, confirmPassword]);

//   grab the token from the url 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <label htmlFor="newpassword">New Password</label>
      <input
        type="password"
        name="newPassword"
        id="newPassword"
        value={newPassword}
        onChange={(e) => {
          setNewPassword(e.target.value);
        }}
      />
      <label htmlFor="confirmpassword">Confirm Password</label>
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
      />
      <button
        type="submit"
        onClick={changePassword}
        className="btn btn-primary bg-blue-400 rounded  m-3"
      >
        {buttonDisable ? "" : "Change Password"}
      </button>
    </div>
  );
}
