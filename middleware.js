import { NextResponse } from "next/server";
import { authPages } from "./middlewares/auth.middleware";

export async function middleware(req) {
  const { pathname } = new URL(req.url);

  switch (true) {
    case pathname.startsWith("/register"): {
      return authPages(req);
    }
    case pathname.startsWith("/login"): {
      return authPages(req);
    }

    default:
      return NextResponse.next();
  }
}

export const config = {
  matcher: ["/register", "/login"],
};
