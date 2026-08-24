/**
 * IEEE SVCE Digital Institution — Next.js Middleware
 *
 * Protects /os/* routes. Unauthenticated users are redirected to /os/login.
 * This runs at the edge before any page or API route.
 */
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Public routes — no auth required
  if (!pathname.startsWith("/os")) {
    return NextResponse.next();
  }

  // Login page itself must be accessible without auth
  if (pathname === "/os/login") {
    // If already authenticated, redirect to dashboard
    if (req.auth) {
      return NextResponse.redirect(new URL("/os", req.url));
    }
    return NextResponse.next();
  }

  // All other /os/* routes require authentication
  if (!req.auth) {
    const loginUrl = new URL("/os/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  // Match all routes except static files and API routes handled by Auth.js
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};
