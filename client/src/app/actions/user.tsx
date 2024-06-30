"use server";

import { BACKEND_URL } from "@/config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/authOptions";
import { MyTasksType } from "@/types";
import { ProjectType } from "@/stores/workspace-store";

export const getMyTasks = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/user/getMyTasks`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
    },
    // next: {tags: ['project']}
  });
  if (!res.ok) {
    return { success: false };
  }
  const data = await res.json();
  if (data.message !== "SUCCESS") {
    return { success: false };
  }
  return { success: true, data: data.data?.tasks as MyTasksType[] };
};

export const getLikedTasks = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/user/getLikedTasks`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
    },
    // next: {tags: ['project']}
  });
  if (!res.ok) {
    return { success: false };
  }
  const data = await res.json();
  if (data.message !== "SUCCESS") {
    return { success: false };
  }
  return { success: true, data: data.data?.tasks as MyTasksType[] };
};

export const getMyWorkspaces = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/user/getMyWorkspaces`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
    },
    // next: {tags: ['project']}
  });
  if (!res.ok) {
    return { success: false };
  }
  const data = await res.json();
  if (data.message !== "SUCCESS") {
    return { success: false };
  }
  return { success: true, data: data.data?.workspaces as MyTasksType[] };
};

export const getMemberProfile = async (id: string) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/user/getMemberProfile/${id}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
    },
    // next: {tags: ['project']}
  });
  if (!res.ok) {
    return { success: false };
  }
  const data = await res.json();
  if (data.message !== "SUCCESS") {
    return { success: false };
  }
  return { success: true, data: data.data };
};

export const getStarredProjects = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/user/getStarredProjects`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
    },
    // next: {tags: ['project']}
  });
  if (!res.ok) {
    return { success: false };
  }
  const data = await res.json();
  if (data.message !== "SUCCESS") {
    return { success: false };
  }
  return { success: true, data: data.data?.projects as ProjectType[] };
};

export const getStarredWorkspaces = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/user/getStarredWorkspaces`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
    },
    // next: {tags: ['project']}
  });
  if (!res.ok) {
    return { success: false };
  }
  const data = await res.json();
  if (data.message !== "SUCCESS") {
    return { success: false };
  }
  return { success: true, data: data.data?.workspaces };
};

export const starUnstarProject = async (projectId:string, type: "STAR" | "UNSTAR") => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");
  let link = type === "STAR" ? "starProject" : "unstarProject"
  const res = await fetch(`${BACKEND_URL}/user/${link}/${projectId}`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
    },
    // next: {tags: ['project']}
  });
  if (!res.ok) {
    return { success: false };
  }
  const data = await res.json();
  if (data.message !== "SUCCESS") {
    return { success: false };
  }
  return { success: true, data: data.data };
};

export const starUnstarWorkspace = async (workspaceId:string, type: "STAR" | "UNSTAR") => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");
  let link = type === "STAR" ? "starWorkspace" : "unstarWorkspace"
  const res = await fetch(`${BACKEND_URL}/user/${link}/${workspaceId}`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
    },
    // next: {tags: ['project']}
  });
  if (!res.ok) {
    return { success: false };
  }
  const data = await res.json();
  if (data.message !== "SUCCESS") {
    return { success: false };
  }
  return { success: true, data: data.data };
};
