import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Set to true to show under-construction page to all visitors.
// Set to false (or delete this file) when ready to go live.
const UNDER_CONSTRUCTION = true;

export function proxy(request: NextRequest) {
  if (!UNDER_CONSTRUCTION) return NextResponse.next();

  const { pathname } = request.nextUrl;

  // Allow the coming-soon page itself through
  if (pathname === "/coming-soon") return NextResponse.next();

  // Redirect everything else to coming-soon
  return NextResponse.redirect(new URL("/coming-soon", request.url));
}

export const config = {
  matcher: [
    // Match all paths except Next.js internals and static assets
    "/((?!_next/static|_next/image|favicon.ico|logo.png).*)",
  ],
};
