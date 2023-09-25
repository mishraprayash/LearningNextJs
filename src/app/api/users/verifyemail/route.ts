import { NextRequest, NextResponse } from "next/server";

import User from "@/models/userModel";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiration: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ message: "Invalid token", success:false }, { status: 400 });
    }
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiration = undefined;
    await user.save();
    return NextResponse.json(
      {
        message: "Email verified",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
