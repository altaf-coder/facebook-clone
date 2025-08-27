import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/",
  "/friends",
  "/notifications",
  "/profile",
  "/post",
];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  const isAuthenticated = !!token;

  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (!isAuthenticated && isProtected) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  if (isAuthenticated && pathname === "/auth") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/auth",
    "/friends",
    "/notifications",
    "/profile/:path*",
    "/post/:path*",
  ],
};
