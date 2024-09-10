import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
 
export default function middleware(req) {
  const cookies = req.cookies.getAll();
  console.log('Cookies:', cookies);

  return NextAuth(authConfig).auth(req);
}
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  // matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|foo).*)']
};