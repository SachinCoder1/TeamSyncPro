"use server";

import { BACKEND_URL } from "@/config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/authOptions";
import { ProjectType, StatusType } from "@/types/project";

export const getProject = async (projectid?: string) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/project/${projectid}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
    },
    cache: "force-cache",
    next: {tags: ['project']}
  });
  if (!res.ok) {
    return { success: false };
  }
  const project = await res.json();
  if (project.message !== "SUCCESS") {
    return { success: false };
  }
  return { success: true, project: project.data as ProjectType };
};

export const getAllStatus = async (projectid?: string) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/project/all-status/${projectid}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
    },
    cache: "force-cache",
    next: {tags: ['status']}
  });
  if (!res.ok) {
    console.log("res not ok..", res)
    return { success: false };
  }
  const project = await res.json();
  console.log("project: ", project)
  if (project.message !== "SUCCESS") {
    return { success: false };
  }
  return { success: true, data: project.data?.status as StatusType[] };
};

type UpdateProjectType = {
  name?: string | undefined;
  description?: string | undefined;
  color?: string | undefined;
  icon?: string | undefined;
};
export const updateProject = async (
  projectid?: string,
  updateData?: UpdateProjectType
) => {
  try {
    console.log("projectId:", projectid);
    console.log("update data:", updateData);
    const session = await getServerSession(authOptions);
    if (!session) redirect("/auth/signin");
    const res = await fetch(`${BACKEND_URL}/project/update/${projectid}`, {
      method: "PATCH",
      body: JSON.stringify(updateData),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session.accessToken.token}`,
      },
    });

    if (!res.ok) {
      return { success: false };
    }
    const project = await res.json();
    console.log("project parsed json:", project);
    if (project.message !== "SUCCESS") {
      return { success: false };
    }
    return { success: true, project: project.data as ProjectType };
  } catch (error) {
    console.log("error in updating projectsssss:", error);
    return { success: false };
  }
};

export const createProject = async (
  name: string,
) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/auth/signin");
    const res = await fetch(`${BACKEND_URL}/project/create`, {
      method: "POST",
      body: JSON.stringify({
        name,
        workspaceId: session.user.workspace
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session.accessToken.token}`,
      },
    });

    if (!res.ok) {
      return { success: false };
    }
    const project = await res.json();
    console.log("project parsed json:", project);
    if (project.message !== "SUCCESS") {
      return { success: false };
    }
    return { success: true, project: project.data?.project as ProjectType };
  } catch (error) {
    console.log("error in updating projectsssss:", error);
    return { success: false };
  }
};
