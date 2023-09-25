import { NextResponse, NextRequest } from "next/server";

import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { confirmPassword, token } = reqBody;
    if(!(token && confirmPassword)){
      return NextResponse.json({
        message:"Not a valid password or token"
      },{
        status:400
      });
    }
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiration: { $gt: Date.now() },
    });
    console.log(user);
    if (!user) {
     return NextResponse.json(
        {
          message: "Invalid Token or Token Expired",
        },
        {
          status: 400,
        }
      );
    }
    user.password = await bcryptjs.hash(confirmPassword, 10);
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiration = undefined;
    await user.save();
    return NextResponse.json(
      {
        message: "Password Changed Successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log(error.message);
  }
}
