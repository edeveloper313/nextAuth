import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPathPublic = ["/login", "/signup", "/verifyemail"].includes(path);

  const token = request.cookies.get("token")?.value;

  if (isPathPublic && token) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  if (!isPathPublic && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup", "/verifyemail", "/profile", "/not-found"],
};
