"use server";

import { BACKEND_URL } from "@/config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/authOptions";
import { InvitationType } from "@/types";

export const inviteToWorkspace = async (
  workspaceId: string,
  membersEmails: string[]
) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/auth/signin");
    const res = await fetch(`${BACKEND_URL}/invite/workspace`, {
      method: "POST",
      body: JSON.stringify({
        workspaceId,
        membersEmails,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session.accessToken.token}`,
      },
    });

    if (!res.ok) {
      return { success: false };
    }
    const data = await res.json();
    console.log("project parsed json:", data);
    if (data.message !== "SUCCESS") {
      return { success: false };
    }
    return { success: true, data: data?.data };
  } catch (error) {
    console.log("error in updating projectsssss:", error);
    return { success: false };
  }
};

export const getInvites = async (
  id: string,
) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/auth/signin");
    const res = await fetch(`${BACKEND_URL}/invite/${id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${session.accessToken.token}`,
      },
      next: {tags: ["invitations"]}
    });

    if (!res.ok) {
      return { success: false };
    }
    const data = await res.json();
    console.log("project parsed json:", data);
    if (data.message !== "SUCCESS") {
      return { success: false };
    }
    return { success: true, data: data?.data as InvitationType[] };
  } catch (error) {
    console.log("error in updating projectsssss:", error);
    return { success: false };
  }
};
