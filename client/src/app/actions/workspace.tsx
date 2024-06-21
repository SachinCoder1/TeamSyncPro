"use server";

import { BACKEND_URL } from "@/config";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { SignupFormData } from "@/components/forms/SignupForm";
import { authOptions } from "@/utils/authOptions";
import { cache } from "react";
import { WorkspaceType } from "@/stores/workspace-store";

export const getWorkspace = async(workspaceId?: string) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");
  console.log("session:", session)
  const res = await fetch(`${BACKEND_URL}/workspace/${workspaceId || session.user.workspace}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
    },
    cache: 'force-cache'
  });
  if (!res.ok) {
    return {success:false};
  }
  const parsedWorkspace = await res.json();
  if (parsedWorkspace.message !== "SUCCESS") {
    return {success:false}
  }
  return {success:true,workspace: (parsedWorkspace.data.workspace as WorkspaceType)};
};
