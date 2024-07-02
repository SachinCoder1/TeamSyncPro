"use server";

import { BACKEND_URL } from "@/config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/authOptions";


export const createSection = async (
    title: string,
    projectId: string
  ) => {
    try {
      const session = await getServerSession(authOptions);
      if (!session) redirect("/auth/signin");
      const res = await fetch(`${BACKEND_URL}/section/add`, {
        method: "POST",
        body: JSON.stringify({
          title,
          projectId
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
      if (project.message !== "CREATED") {
        return { success: false };
      }
      return { success: true, project: project.data as any };
    } catch (error) {
      console.log("error in updating projectsssss:", error);
      return { success: false };
    }
  };

export const updateSection = async (
    title: string,
    sectionId: string
  ) => {
    try {
      const session = await getServerSession(authOptions);
      if (!session) redirect("/auth/signin");
      const res = await fetch(`${BACKEND_URL}/section/update/${sectionId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title,
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
      return { success: true, data: project.data as any };
    } catch (error) {
      console.log("error in updating projectsssss:", error);
      return { success: false };
    }
  };

export const copySection = async (
    projectId: string,
    sectionId: string,
  ) => {
    try {
      const session = await getServerSession(authOptions);
      if (!session) redirect("/auth/signin");
      const res = await fetch(`${BACKEND_URL}/section/copy/${projectId}/${sectionId}`, {
        method: "POST",
        headers: {
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
      return { success: true, data: project.data as any };
    } catch (error) {
      console.log("error in updating projectsssss:", error);
      return { success: false };
    }
  };