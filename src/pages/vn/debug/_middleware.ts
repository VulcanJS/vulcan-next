import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  // @see https://nextjs.org/docs/messages/middleware-relative-urls
  if (
    process.env.NODE_ENV === "production" &&
    // FIXME: 05/2022 this won't work as expected, env variables are set at build-time: https://github.com/vercel/next.js/discussions/36338
    //process.env.NEXT_PUBLIC_NODE_ENV !== "test"
    // Instead set "NEXT_PUBLIC_IS_LOCAL=1" in .env.production.local
    !process.env.NEXT_PUBLIC_IS_LOCAL
  ) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    console.warn(
      "Debug pages cannot be accessed in production. Current NODE_ENV:",
      process.env.NODE_ENV,
      "Current public NODE_ENV:",
      process.env.NEXT_PUBLIC_NODE_ENV,
      "Current public NEXT_PUBLIC_IS_LOCAL:",
      process.env.NEXT_PUBLIC_IS_LOCAL
    );
    return NextResponse.redirect(url);
  }
  // In dev and test mode we can access the pages
  return NextResponse.next();
}
