import { getDataFromToken } from "@/helpers/getDatafromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

export async function GET(request:NextRequest) {
  try {
    // grabbing userId returned by this function and also passing the incoming request so that we can grab the cookies from the request.
    const userId = await getDataFromToken(request);
    if(!userId){
      return NextResponse.json({message:"Couldnot find the user info"});
    }
    // querying the database to grab the user with given id and specifying not to fetch password.
    const user = await User.findOne({_id: userId}).select("-password")

    return NextResponse.json({
        message:'User found',
        data:user
    })
  } catch (error: any) {
    return NextResponse.json({error: error.message},{status: 400});
  }
}
