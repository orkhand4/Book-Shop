import { NextResponse } from "next/server";
export const middleware = (req) => {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api/auth") && req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );}


  }
