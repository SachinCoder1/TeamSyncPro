import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log("req nextuaht middleware: ", req.nextauth.token?.user);
    if(!req.nextauth.token?.user.onboarding.done){
      return NextResponse.redirect(new URL("/onboarding?step=1", req.url));
    }
  },
)

export const config = { matcher: ["/dashboard"] }