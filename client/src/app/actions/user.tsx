"use server";

import { BACKEND_URL } from "@/config";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const signInUser = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");
  const res = await fetch(BACKEND_URL + "/user", {
    method: "GET",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
    },
  });
  const user = await res.json();
  console.log("this is the user we got ......", user);
  if (!user || user.message !== "SUCCESS") {
    redirect("/auth/signin?error=invalid-credentials");
  }

  redirect("/");
  // } catch (error) {
  //   console.log("error: ", error);
  // }
};
