// middleware file location must be in same level as the app directory level.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPubic = (path === "/") || (path === "/login") || (path === "/signup");
  // accesing a token from cookies
  const token = request.cookies.get("token")?.value || "";
  // if the path is pulbic and token is already present in the cookie then it means that the user is logged in.
  // so user shoulnot be able to visit login or sign up page while logged in.
  if (isPubic && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  // similarly when path is not public and token is not set, that means user isnot logged in he/she
  // so user should not be able to visit profile page while not logged in.
  if (!isPubic && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// this is a method by which we can pass the pages on which we want our middleware to work.
// we can also use regex pattern here to match the different URLs.
export const config = {
  matcher: ["/", "/login", "/signup", "/profile","/profile/:path*"],
};
