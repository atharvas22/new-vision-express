import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Site is live — set to true to re-enable the coming-soon gate
const UNDER_CONSTRUCTION = false;

const PREVIEW_KEY = process.env.PREVIEW_KEY || "nve-preview-2026";

export function middleware(request: NextRequest) {
  if (!UNDER_CONSTRUCTION) return NextResponse.next();

  const { pathname, searchParams } = request.nextUrl;

  if (searchParams.get("preview") === PREVIEW_KEY) {
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.set("preview_mode", "true", {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      path: "/",
    });
    return response;
  }

  if (request.cookies.get("preview_mode")?.value === "true") {
    return NextResponse.next();
  }

  if (pathname === "/coming-soon") return NextResponse.next();

  return NextResponse.redirect(new URL("/coming-soon", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|logo.png).*)"],
};
