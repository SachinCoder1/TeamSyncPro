"use server";

import { BACKEND_URL } from "@/config";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export const signInUser = async (email: string, password: string) => {
  try {
    await signIn("credentials", { username: email, password });
  } catch (error) {
    console.log("error: ", error);
  }
};
