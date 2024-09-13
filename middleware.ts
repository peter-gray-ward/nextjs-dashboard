import NextAuth from "next-auth";
import { type NextRequest } from "next/server";
import { authConfig } from "./auth.config";

export default function middleware(req: NextRequest) {
  const cookies = req.cookies.getAll();
  console.log("Cookies:", cookies);

  return NextAuth(authConfig).auth(req as any);
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  // matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|foo|seed).*)"],
};
