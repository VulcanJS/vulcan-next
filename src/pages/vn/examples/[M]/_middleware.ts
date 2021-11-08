import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { encode } from "./megaparam-demo";

export function middleware(req: NextRequest, event: NextFetchEvent) {
  // get the current params from the cookies, eg theme
  // you can also get them from headers, url, route params...
  const theme = (req.cookies["theme"] || "light") as "light" | "dark";
  const company = req.cookies["company"] || "Unknown_company";
  // Here, you could run some checks, like
  // verifying that current user can actually access this company
  // and that the theme is valid
  const isValid = true;
  // convert to a megaparam
  const megaparam = encode({
    theme,
    company,
  });
  const res = NextResponse.rewrite(`/vn/examples/${megaparam}/megaparam-demo`);
  // remember theme if not yet done
  if (!req.cookies["theme"]) {
    res.cookies["theme"] = theme;
  }
  if (!req.cookies["company"]) {
    res.cookies["my_company"] = theme;
  }
  return res;
}
