"use server";

import { BACKEND_URL } from "@/config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/authOptions";
import { ProjectType } from "@/types/project";

export const getProject = async (projectid?: string) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/project/${projectid}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
    },
    cache: "force-cache",
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
