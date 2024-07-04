import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log("req.nextauth.token?.user", req.nextauth.token?.user);
    console.log("req.url....: ", req.url);
    const isOnboardingDone = req.nextauth.token?.user.onboarding.done;
    // if (!isOnboardingDone) {
    //   return NextResponse.rewrite(new URL("/onboarding?step=1", req.url));
    // }
    // if (req.url.includes("/onboarding") && isOnboardingDone) {
    //   return NextResponse.rewrite(new URL("/", req.url));
    // }
  }
);

// onboarding with any query params and dashboard will be
export const config = { matcher: ["/dashboard","/workspace", "/onboarding/:path*", "/invite/accept", "/home"] };
