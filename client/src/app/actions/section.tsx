"use server";

import { BACKEND_URL } from "@/config";
import { getServerAuth } from "@/lib/auth";

export const createSection = async (title: string, projectId: string) => {
  try {
    const session = await getServerAuth();
    // if (!session) redirect("/auth/signin");
    const res = await fetch(`${BACKEND_URL}/section/add`, {
      method: "POST",
      body: JSON.stringify({
        title,
        projectId,
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

export const updateSection = async (title: string, sectionId: string) => {
  try {
    const session = await getServerAuth();
    // if (!session) redirect("/auth/signin");
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

export const reorderSection = async (
  sectionId: string,
  beforeSectionId: string,
  afterSectionId: string,
  projectId: string
) => {
  try {
    const session = await getServerAuth();
    // if (!session) redirect("/auth/signin");
    console.log("section id:", sectionId, "before section id:", beforeSectionId, "after section id:", afterSectionId)
    const res = await fetch(`${BACKEND_URL}/section/reorder`, {
      method: "PATCH",
      body: JSON.stringify({
        sectionId,
        beforeSectionId,
        afterSectionId,
        projectId,
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
    return { success: true, data: project.data?.section as any };
  } catch (error) {
    console.log("error in updating projectsssss:", error);
    return { success: false };
  }
};

export const copySection = async (projectId: string, sectionId: string) => {
  try {
    const session = await getServerAuth();
    // if (!session) redirect("/auth/signin");
    const res = await fetch(
      `${BACKEND_URL}/section/copy/${projectId}/${sectionId}`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${session.accessToken.token}`,
        },
      }
    );

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

export const deleteSection = async (projectId: string, sectionId: string) => {
  try {
    const session = await getServerAuth();
    // if (!session) redirect("/auth/signin");
    const res = await fetch(
      `${BACKEND_URL}/section/${projectId}/${sectionId}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${session.accessToken.token}`,
        },
      }
    );

    if (!res.ok) {
      return { success: false };
    }
    const project = await res.json();
    console.log("section delete parsed json:", project);
    if (project.message !== "DELETED") {
      return { success: false };
    }
    return { success: true, data: project.data as any };
  } catch (error) {
    console.log("error in deleting section:", error);
    return { success: false };
  }
};
