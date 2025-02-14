import { NextResponse } from "next/server";
import { authPages, privatePages } from "./middlewares/auth.middleware";
import { NewAddressesMiddleware } from "./middlewares/account.middleware";

export async function middleware(req) {
  const { pathname } = new URL(req.url);

  if (pathname.startsWith("/register") || pathname.startsWith("/login")) {
    return authPages(req);
  }
  if (pathname.startsWith("/account/addresses/new")) {
    return privatePages(req, NewAddressesMiddleware);
  }
  if (pathname.startsWith("/account")) {
    return privatePages(req);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/register", "/login", "/account/:path*"],
};
