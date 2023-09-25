import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import jwt from "jsonwebtoken";

// connectDB();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log("Here", reqBody);
    // check if user already exists
    const user = await User.findOne({ email: email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    // hashing the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    // send verification email when user signup
    const emailResponse = await sendEmail(
      email,
      "VERIFY_EMAIL",
      savedUser._id.toString()
    );

    // creating a token and redirecting user to the dashboard after signing.
    const tokenData = {
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
    };
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    // create a response to be sent
    const response = NextResponse.json({
      message: "User created successfully",
      success: true,
      data: savedUser,
    });

    // set the cookiees to the respoinse
    response.cookies.set("token", token, { httpOnly: true });
    // return the final respoonse
    return response;
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
