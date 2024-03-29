import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function getServerAuth() {
    // get the callback url from the query params without using the `req` object
  const session = await getServerSession(authOptions);
  if (!session) {
    // redirect to login page
    redirect("/auth/signin");
  }
}
