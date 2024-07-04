"use server";

import { BACKEND_URL } from "@/config";
import { getServerAuth } from "@/lib/auth";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/authOptions";
import { InvitationType } from "@/types";

export const inviteToWorkspace = async (
  workspaceId: string,
  membersEmails: string[]
) => {
  try {
    const session = await getServerAuth();
    // // if (!session) redirect("/auth/signin");
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

export const acceptInvitation = async (invitationToken: string) => {
  try {
    const session = await getServerAuth();
    // if (!session) redirect("/auth/signin");
    console.log("invitation token:", invitationToken);
    const res = await fetch(`${BACKEND_URL}/invite/accept`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${session.accessToken.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        invitationToken,
      }),
    });

    if (!res.ok) {
      console.log("res failed");
      return { success: false };
    }
    const data = await res.json();
    console.log("project parsed json:", data);
    if (data.message !== "SUCCESS") {
      return { success: false };
    }
    return { success: true, data: data?.data as any };
  } catch (error) {
    console.log("error in updating projectsssss:", error);
    return { success: false };
  }
};

export const getInvites = async (id: string) => {
  try {
    const session = await getServerAuth();
    // if (!session) redirect("/auth/signin");
    const res = await fetch(`${BACKEND_URL}/invite/${id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${session.accessToken.token}`,
      },
      next: { tags: ["invitations"] },
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

export const checkInvitation = async (invitationToken: string) => {
  try {
    const session = await getServerAuth();
    // if (!session) redirect("/auth/signin");
    const res = await fetch(
      `${BACKEND_URL}/invite/check-invite/${invitationToken}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${session.accessToken.token}`,
        },
        next: { tags: ["check-invitation"] },
      }
    );

    if (!res.ok) {
      return { success: false, errorMessage: res.statusText, errorCode: res.status };
    }
    const data = await res.json();
    console.log("project parsed json:", data);
    if (data.message !== "SUCCESS") {
      return { success: false };
    }
    return { success: true, data: data?.data };
  } catch (error) {
    console.log("error in updating projectsssss:", error);
    return { success: false, error };
  }
};
