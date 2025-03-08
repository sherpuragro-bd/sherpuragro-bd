import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function NewAddressesMiddleware(req) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/addressescount?user=${token.email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${process.env.JWT_SECRET}`,
        },
      }
    );
    const addressesCount = await res.json();
    if (addressesCount >= 3) {
      return NextResponse.rewrite(new URL("/404", req.url));
    }
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
