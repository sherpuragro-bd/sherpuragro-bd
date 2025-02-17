import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(res) {
  const cookieStore = await cookies();
  cookieStore.delete("next-auth.session-token");

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/login`);
}
