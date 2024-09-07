"use server";

import { BACKEND_URL } from "@/config";
import { getServerAuth } from "@/lib/auth";

import { WorkspaceType } from "@/stores/workspace-store";
import { TagType } from "@/types/project";

export const getWorkspace = async () => {
  const session = await getServerAuth();
  if (!session) {
    // Handle the case where the user is redirected and session is null
    return { success: false };
  }

  // if (!session) redirect("/auth/signin");
  const res = await fetch(
    `${BACKEND_URL}/workspace/${session.user.workspace}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${session.accessToken.token}`,
      },
      cache: "no-cache",
      next: { tags: ["workspace", "my-workspace"], revalidate: 15 },
    }
  );
  if (!res.ok) {
    return { success: false,status: res?.status };
  }
  const parsedWorkspace = await res.json();
  if (parsedWorkspace.message !== "SUCCESS") {
    return { success: false };
  }
  return {
    success: true,
    workspace: parsedWorkspace.data.workspace as WorkspaceType,
  };
};


export const createWorkspace = async (
  name: string,
  membersEmails: string[]
) => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/workspace/create-workspace`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      membersEmails,
    }),
  });
  if (!res.ok) {
    return { success: false,status: res?.status };
  }
  const parsedWorkspace = await res.json();
  if (parsedWorkspace.message !== "SUCCESS") {
    return { success: false };
  }
  return {
    success: true,
    workspace: parsedWorkspace.data.workspace as WorkspaceType,
  };
};

export const getTags = async () => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  const res = await fetch(
    `${BACKEND_URL}/workspace/tags/${session.user.workspace}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${session.accessToken.token}`,
      },
      cache: "force-cache",
    }
  );
  if (!res.ok) {
    return { success: false,status: res?.status };
  }
  const parsedWorkspace = await res.json();
  if (parsedWorkspace.message !== "SUCCESS") {
    return { success: false };
  }
  return { success: true, data: parsedWorkspace.data.tags as TagType[] };
};
