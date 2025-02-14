import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function NewAddressesMiddleware(req) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const res = await fetch(
      new URL(`/api/addressescount?user=${token.email}`, req.url)
    );
    const addressesCount = await res.json();
    console.log(addressesCount);
    if (addressesCount >= 3) {
      return NextResponse.rewrite(new URL("/404", req.url));
    }
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
