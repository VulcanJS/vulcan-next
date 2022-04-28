import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  // @see https://nextjs.org/docs/messages/middleware-relative-urls
  if (process.env.NODE_ENV === "production") {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    console.warn("Debug pages cannot be accessed in production.");
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
