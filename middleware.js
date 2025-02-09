import { NextResponse } from "next/server";
import { authPages, privatePages } from "./middlewares/auth.middleware";

export async function middleware(req) {
  const { pathname } = new URL(req.url);

  switch (true) {
    case pathname.startsWith("/register"): {
      return authPages(req);
    }
    case pathname.startsWith("/login"): {
      return authPages(req);
    }
    case pathname.startsWith("/account"): {
      return privatePages(req);
    }
    default:
      return NextResponse.next();
  }
}

export const config = {
  matcher: ["/register", "/login", "/account"],
};
