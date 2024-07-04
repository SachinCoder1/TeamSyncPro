"use server";

import { BACKEND_URL } from "@/config";
import { getServerAuth } from "@/lib/auth";

import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { SignupFormData } from "@/components/forms/SignupForm";
import { authOptions } from "@/utils/authOptions";

export const signInUser = async (invitation_token: string|null) => {
  const session = await getServerAuth();
  // // if (!session) redirect("/auth/signin");
  const res = await fetch(BACKEND_URL + "/user", {
    method: "GET",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
    },
  });
  const user = await res.json();
  if (!user || user.message !== "SUCCESS") {
    redirect("/auth/signin?error=invalid-credentials");
  }

  if (invitation_token) {
    redirect(`/invite/accept?invitation_token=${invitation_token}`);
  }

  if (user.data.user.onboarding.done === false) {
    redirect("/onboarding?step=1");
  }

  redirect("/home");
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
  return user;

  // } catch (error) {
  //   console.log("error: ", error);
  // }
};
