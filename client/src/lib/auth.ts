import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function getServerAuth() {
  // get the callback url from the query params without using the `req` object
  const session:any = await getServerSession(authOptions);
  if (!session) {
    // redirect to login page
      // redirect("/auth/signin");
      NextResponse.redirect("http://localhost:3000/auth/signin")
  }
  return session;
}
