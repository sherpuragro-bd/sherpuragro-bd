import { NextResponse } from "next/server";

export const apiSecureMiddleware = (req) => {
  const authorizationHeader = req.headers.get("Authorization");

  if (authorizationHeader !== process.env.JWT_SECRET) {
    return NextResponse.json(
      { error: "Unauthorized request" },
      { status: 401 }
    );
  }
  return NextResponse.next();
};
