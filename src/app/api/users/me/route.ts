import { getDataFromToken } from "@/helpers/getDatafromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

export async function GET(request: NextRequest) {
  try {
    // extract data from token
    const userInfo = await getDataFromToken(request);
    // search for the user in database
    const user = await User.findOne({_id: userInfo.id}).select("-password")
    console.log(user)
    // returing the user information
    return NextResponse.json({
        message:'User found',
        data:user
    })
  } catch (error: any) {
    NextResponse.json({error: error.message},{status: 400});
  }
}
