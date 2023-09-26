// this is an external helper function that we have inside the helper directory which is also in the same level as the app directory.

// this function is basicaly used to extract the user detals from the token.

import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

export const getDataFromToken = async (request:NextRequest)=>
{
    try {
        // acessing the token 
        const token = request.cookies.get('token')?.value || '';
        // decoding the token using the TOKEN_SECRET

        const decodedToken:any = await jwt.verify(token,process.env.TOKEN_SECRET!)
        // returning the decoded token id
        return decodedToken.id;
    } catch (error:any) {
        console.log("error in decoding token",error)
        throw new Error(error);
    }
}