import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Set to true to show under-construction page to all visitors.
// Set to false (or delete this file) when ready to go live.
const UNDER_CONSTRUCTION = true;

// Secret key for preview access.
// Share this URL with stakeholders: https://yourdomain.com/?preview=nve-preview-2026
// Store a custom key in Vercel env vars as PREVIEW_KEY to override this default.
const PREVIEW_KEY =
  process.env.PREVIEW_KEY || "nve-preview-2026";

export function proxy(request: NextRequest) {
  if (!UNDER_CONSTRUCTION) return NextResponse.next();

  const { pathname, searchParams } = request.nextUrl;

  // If ?preview=KEY is in the URL, set a cookie and redirect to homepage
  if (searchParams.get("preview") === PREVIEW_KEY) {
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.set("preview_mode", "true", {
      httpOnly: true,
      maxAge: 60 * 60 * 24, // cookie lasts 24 hours
      path: "/",
    });
    return response;
  }

  // If the preview cookie is present, allow full site access
  if (request.cookies.get("preview_mode")?.value === "true") {
    return NextResponse.next();
  }

  // Allow the coming-soon page itself through
  if (pathname === "/coming-soon") return NextResponse.next();

  // Everyone else sees the coming-soon page
  return NextResponse.redirect(new URL("/coming-soon", request.url));
}

export const config = {
  matcher: [
    // Match all paths except Next.js internals and static assets
    "/((?!_next/static|_next/image|favicon.ico|logo.png).*)",
  ],
};
