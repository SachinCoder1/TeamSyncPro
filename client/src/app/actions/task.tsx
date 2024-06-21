"use server";

import { BACKEND_URL } from "@/config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/authOptions";
import { ProjectType } from "@/types/project";

export const getAllTasks = async (projectid?: string) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/section/sections/${projectid}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
    },
    cache: "force-cache",
    next: {tags: ['sections']}
  });
  if (!res.ok) {
    return { success: false };
  }
  const sections = await res.json();
  console.log("sections...:", sections)
  if (sections.message !== "SUCCESS") {
    return { success: false };
  }
  return { success: true, sections: sections.data as ProjectType };
};