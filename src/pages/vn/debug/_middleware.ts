import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (process.env.NODE_ENV === "production") {
    console.warn("Debug pages cannot be accessed in production.");
    return NextResponse.redirect("/");
  }
  return NextResponse.next();
}
