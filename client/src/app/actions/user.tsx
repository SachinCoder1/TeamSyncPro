"use server";

import { BACKEND_URL } from "@/config";
import { getServerAuth } from "@/lib/auth";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/authOptions";
import { MyTasksType, ShortMemberType, StarredDataType } from "@/types";
import { ProjectType } from "@/stores/workspace-store";

export const getMyTasks = async () => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/user/getMyTasks`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session?.accessToken?.token}`,
    },
    next: {tags: ['myStarredItems']}
  });
  if (!res.ok) {
    return { success: false,status: res?.status };
  }
  const data = await res.json();
  if (data.message !== "SUCCESS") {
    return { success: false };
  }
  return { success: true, data: data.data?.tasks as MyTasksType[] };
};

export const getQueriedTasks = async (query: string) => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  const res = await fetch(
    `${BACKEND_URL}/user/getQueriedTasks?searchTerm=${query || ""}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${session.accessToken.token}`,
      },
      // next: {tags: ['project']}
    }
  );
  if (!res.ok) {
    return { success: false,status: res?.status };
  }
  const data = await res.json();
  if (data.message !== "SUCCESS") {
    return { success: false };
  }
  return { success: true, data: data.data?.tasks as MyTasksType[] };
};

export const getLikedTasks = async () => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/user/getLikedTasks`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
    },
    // next: {tags: ['project']}
  });
  if (!res.ok) {
    return { success: false,status: res?.status };
  }
  const data = await res.json();
  if (data.message !== "SUCCESS") {
    return { success: false };
  }
  return { success: true, data: data.data?.tasks as MyTasksType[] };
};

export const getMyWorkspaces = async () => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/user/getMyWorkspaces`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session?.accessToken?.token}`,
    },
    // next: {tags: ['project']}
  });
  if (!res.ok) {
    return { success: false,status: res?.status };
  }
  const data = await res.json();
  if (data.message !== "SUCCESS") {
    return { success: false };
  }
  return { success: true, data: data.data?.workspaces as {_id:string;name:string;}[] };
};

export const getMemberProfile = async (id: string) => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/user/getMemberProfile/${id}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
    },
    // next: {tags: ['project']}
  });
  if (!res.ok) {
    return { success: false,status: res?.status };
  }
  const data = await res.json();
  if (data.message !== "SUCCESS") {
    return { success: false };
  }
  return { success: true, data: data.data };
};

export const getMemberShortProfile = async (id: string) => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/user/getMemberShortProfile/${id}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
    },
    // next: {tags: ['project']}
  });
  if (!res.ok) {
    return { success: false,status: res?.status };
  }
  const data = await res.json();
  if (data.message !== "SUCCESS") {
    return { success: false };
  }
  return { success: true, data: data.data.user as  ShortMemberType};
};

export const getStarredProjects = async () => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/user/getStarredProjects`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
    },
    next: {tags: ['myStarredItems']}
  });
  if (!res.ok) {
    return { success: false,status: res?.status };
  }
  const data = await res.json();
  if (data.message !== "SUCCESS") {
    return { success: false };
  }
  return { success: true, data: data.data?.projects as ProjectType[] };
};

export const getStarredWorkspaces = async () => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/user/getStarredWorkspaces`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
    },
    next: {tags: ['myStarredItems']}
  });
  if (!res.ok) {
    return { success: false,status: res?.status };
  }
  const data = await res.json();
  if (data.message !== "SUCCESS") {
    return { success: false };
  }
  return { success: true, data: data.data?.workspaces };
};

export const getStarredItems = async () => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/user/getStarredItems`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session?.accessToken?.token}`,
    },
    next: { tags: ["starred-items", "isStarred","myStarredItems"] },
  });
  if (!res.ok) {
    return { success: false,status: res?.status };
  }
  const data = await res.json();
  if (data.message !== "SUCCESS") {
    return { success: false };
  }
  return { success: true, data: data.data as StarredDataType };
};

export const updateSelectedWorkspace = async (workspaceId:string) => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/user/updateSelectedWorkspace/${workspaceId}`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
    },
  });
  if (!res.ok) {
    return { success: false,status: res?.status };
  }
  const data = await res.json();
  if (data.message !== "SUCCESS") {
    return { success: false };
  }
  return { success: true, data: data.data };
};

export const starUnstarProject = async (
  projectId: string,
  type: "STAR" | "UNSTAR"
) => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  let link = type === "STAR" ? "starProject" : "unstarProject";
  const res = await fetch(`${BACKEND_URL}/user/${link}/${projectId}`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
    },
    // next: {tags: ['project']}
  });
  if (!res.ok) {
    return { success: false,status: res?.status };
  }
  const data = await res.json();
  if (data.message !== "SUCCESS") {
    return { success: false };
  }
  return { success: true, data: data.data };
};

export const starUnstarWorkspace = async (
  workspaceId: string,
  type: "STAR" | "UNSTAR"
) => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  let link = type === "STAR" ? "starWorkspace" : "unstarWorkspace";
  const res = await fetch(`${BACKEND_URL}/user/${link}/${workspaceId}`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
    },
    // next: {tags: ['project']}
  });
  if (!res.ok) {
    return { success: false,status: res?.status };
  }
  const data = await res.json();
  if (data.message !== "SUCCESS") {
    return { success: false };
  }
  return { success: true, data: data.data };
};

export const isStarred = async (id: string, type: "project" | "workspace") => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/user/isStarred/${type}/${id}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
    },
    next: { tags: ["isStarred"] },
  });
  if (!res.ok) {
    return { success: false,status: res?.status };
  }
  const data = await res.json();
  if (data.message !== "SUCCESS") {
    return { success: false };
  }
  return { success: true, data: data.data?.starred as boolean };
};
