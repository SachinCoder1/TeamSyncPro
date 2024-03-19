"use server";

import { BACKEND_URL } from "@/config";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { SignupFormData } from "@/components/forms/SignupForm";

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
  console.log("this is the user we got in signInUser ......", user);
  if (!user || user.message !== "SUCCESS") {
    redirect("/auth/signin?error=invalid-credentials");
  }

  console.log("user.data.user.onboarding", user.data.user.onboarding);
  if (user.data.user.onboarding.done === false) {
    redirect("/onboarding?step=1");
  }

  redirect("/");
};
export const signUpUser = async (data: SignupFormData) => {
  const res = await fetch(BACKEND_URL + "/auth/signup-email", {
    method: "POST",
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      name: data.name,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const user = await res.json();
  console.log("this is the signup data we got ......", user);
  return user;

  // } catch (error) {
  //   console.log("error: ", error);
  // }
};
