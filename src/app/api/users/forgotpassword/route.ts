import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log(reqBody);
    const { email } = reqBody;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 400,
        }
      );
    }
    // console.log(user._id,email);
    const emailResponse = await sendEmail(
      email,
      "RESET_PASSWORD",
      user._id.toString()
    );
    if (!emailResponse) {
      return NextResponse.json(
        {
          message: "Some error occured",
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json(
      {
        message: "Forgot Password Link Sent To Your Email",
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log(error.message);
  }
}
