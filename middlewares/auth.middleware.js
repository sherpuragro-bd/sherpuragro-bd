import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const authPages = async (req) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (token) {
    return NextResponse.redirect(new URL("/account", req.url));
  }

  return NextResponse.next();
};
