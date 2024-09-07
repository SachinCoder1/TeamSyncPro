"use server";

import { BACKEND_URL } from "@/config";
import { getServerAuth } from "@/lib/auth";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/authOptions";
import { CommentType, ProjectType, TagType, TaskType } from "@/types/project";

export const markCompleteIncomplete = async (
  taskId?: string,
  mark?: boolean
) => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  let todo = mark ? "mark-complete" : "mark-incomplete";
  const res = await fetch(`${BACKEND_URL}/task/${todo}/${taskId}`, {
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
  if (data.message !== "UPDATED") {
    return { success: false };
  }
  return { success: true, data: data.data as ProjectType };
};

export const getPerticularTask = async (taskId: string, projectId: string) => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/task/get/${projectId}/${taskId}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
    },
    next: { tags: ["task"] },
    cache: "no-store",
  });
  if (!res.ok) {
    return { success: false,status: res?.status };
  }
  const data = await res.json();
  if (data.message !== "SUCCESS") {
    return { success: false };
  }
  return { success: true, task: data.data?.task as TaskType };
};

type UpdateTaskType = {
  title?: string | undefined;
  description?: string | undefined;
  storyPoints?: number | undefined;
  priority?: "LOW" | "MEDIUM" | "HIGH" | "HIGHEST" | undefined;
};

export const updateTask = async (taskId?: string, payload?: UpdateTaskType) => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/task/update/${taskId}`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    // next: {tags: ['project']}
  });
  if (!res.ok) {
    return { success: false,status: res?.status };
  }
  const data = await res.json();
  if (data.message !== "UPDATED") {
    return { success: false };
  }
  return { success: true, data: data.data?.comment as CommentType };
};
type AddTagType = {
  name: string;
  color?: string;
  workspaceId: string;
  taskId: string;
};

export const addTag = async (payload: AddTagType) => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/task/add-tag`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    // next: {tags: ['project']}
  });
  if (!res.ok) {
    return { success: false,status: res?.status };
  }
  const data = await res.json();
  if (data.message !== "CREATED") {
    return { success: false };
  }
  return { success: true, data: data.data?.tag as TagType };
};
export const removeTag = async (tagId: string, taskId: string) => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/task/remove-tag/${tagId}/${taskId}`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
      "Content-Type": "application/json",
    },
    // next: {tags: ['project']}
  });
  if (!res.ok) {
    return { success: false,status: res?.status };
  }
  const data = await res.json();
  if (data.message !== "UPDATED") {
    return { success: false };
  }
  return { success: true, data: data.data?.tag as { _id: string } };
};

export const getSubTasks = async (parentTaskId: string) => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/task/get-subtask/${parentTaskId}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
    },
    next: { tags: ["subtasks"] },
  });
  if (!res.ok) {
    return { success: false,status: res?.status };
  }
  const data = await res.json();
  if (data.message !== "SUCCESS") {
    return { success: false };
  }
  return { success: true, data: data.data?.subTasks as TaskType[] };
};

export const createSubTask = async (parentTaskId: string, title: string) => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/task/createSubTask`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parentTaskId,
      title,
    }),
    // next: {tags: ['project']}
  });
  if (!res.ok) {
    return { success: false,status: res?.status };
  }
  const data = await res.json();
  if (data.message !== "CREATED") {
    return { success: false };
  }
  return { success: true, data: data.data?.subTask as TaskType };
};

export const deleteTask = async (taskId: string) => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/task/delete/${taskId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
    },
    // next: {tags: ['project']}
  });
  if (!res.ok) {
    return { success: false,status: res?.status };
  }
  const data = await res.json();
  if (data.message !== "DELETED") {
    return { success: false };
  }
  return { success: true, data: data.data as { task: string; title: string } };
};

export const cloneTask = async (taskId: string, title: string) => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/task/copy/${taskId}`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
    }),
    // next: {tags: ['project']}
  });
  if (!res.ok) {
    return { success: false,status: res?.status };
  }
  const data = await res.json();
  if (data.message !== "CREATED") {
    return { success: false };
  }
  return { success: true, data: data.data?.task as TaskType };
};

export const addDueDate = async (taskId: string, dueDate: Date) => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/task/due/${taskId}`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      dueDate,
    }),
    // next: {tags: ['project']}
  });
  if (!res.ok) {
    return { success: false,status: res?.status };
  }
  const data = await res.json();
  if (data.message !== "UPDATED") {
    return { success: false };
  }
  return { success: true, data: data.data?.task as TaskType };
};

export const addDependency = async (
  taskId: string,
  dependencyId: string,
  dependencyType: "BLOCKS" | "IS_BLOCKED_BY"
) => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  const res = await fetch(
    `${BACKEND_URL}/task/add-dependency/${taskId}/${dependencyId}/${dependencyType}`,
    {
      method: "PATCH",
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
  if (data.message !== "UPDATED") {
    return { success: false };
  }
  return { success: true, data: data.data?.task as TaskType };
};

export const removeDependency = async (taskId: string) => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/task/remove-dependency/${taskId}`, {
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
  if (data.message !== "UPDATED") {
    return { success: false };
  }
  return { success: true, data: data.data?.task as TaskType };
};

export const removeDueDate = async (taskId: string) => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/task/remove-due/${taskId}`, {
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
  if (data.message !== "UPDATED") {
    return { success: false };
  }
  return { success: true, data: data.data?.task as TaskType };
};

export const assignTask = async (taskId: string, userId: string) => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/task/assign/${taskId}/${userId}`, {
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
  if (data.message !== "UPDATED") {
    return { success: false };
  }
  return { success: true, data: data.data?.task as TaskType };
};

export const unAssignTask = async (taskId: string) => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/task/unassign/${taskId}`, {
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
  if (data.message !== "UPDATED") {
    return { success: false };
  }
  return { success: true, data: data.data?.task as TaskType };
};

export const changeTaskStatus = async (taskId: string, sectionId: string) => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  const res = await fetch(
    `${BACKEND_URL}/task/change-status/${sectionId}/${taskId}`,
    {
      method: "PATCH",
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
  if (data.message !== "CREATED") {
    return { success: false };
  }
  return { success: true, data: data.data?.task as TaskType };
};

// Comments

export const addComment = async (taskId: string, comment: string) => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/task/add-comment`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      taskId,
      comment,
    }),
    // next: {tags: ['project']}
  });
  if (!res.ok) {
    return { success: false,status: res?.status };
  }
  const data = await res.json();
  if (data.message !== "UPDATED") {
    return { success: false };
  }
  return { success: true, data: data.data?.comment as CommentType };
};

export const getComments = async (taskId: string) => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/task/get-comments/${taskId}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
    },
    next: { tags: ["comments"] },
    cache: "force-cache",
  });
  if (!res.ok) {
    return { success: false,status: res?.status };
  }
  const data = await res.json();
  if (data.message !== "SUCCESS") {
    return { success: false };
  }
  return { success: true, data: data.data?.comments as CommentType };
};

export const updateComment = async (commentId: string, comment: string) => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/task/update-comment`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      commentId,
      comment,
    }),
    // next: {tags: ['project']}
  });
  if (!res.ok) {
    return { success: false,status: res?.status };
  }
  const data = await res.json();
  if (data.message !== "UPDATED") {
    return { success: false };
  }
  return { success: true, data: data.data?.comment as CommentType };
};

export const reorderTaskInBetween = async (
  taskId: string,
  beforeTaskId: string,
  afterTaskId: string,
  beforeSectionId?: string,
  afterSectionId?: string,
) => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/task/reorder`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      taskId,
      beforeTaskId,
      afterTaskId,
      beforeSectionId: beforeSectionId || "",
      afterSectionId: afterSectionId || "",
    }),
    // next: {tags: ['project']}
  });
  if (!res.ok) {
    return { success: false,status: res?.status };
  }
  const data = await res.json();
  if (data.message !== "UPDATED") {
    return { success: false };
  }
  return { success: true, data: data.data?.task as TaskType };
};

export const createTask = async (
  title: string,
  projectId: string,
  sectionId: string
) => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/task/create`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      projectId,
      sectionId,
    }),
    // next: {tags: ['project']}
  });
  if (!res.ok) {
    return { success: false,status: res?.status };
  }
  const data = await res.json();
  if (data.message !== "CREATED") {
    return { success: false };
  }
  return { success: true, data: data.data?.task as TaskType };
};

export const deleteComment = async (commentId: string) => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  const res = await fetch(`${BACKEND_URL}/task/remove-comment/${commentId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
    },
    // next: {tags: ['project']}
  });
  if (!res.ok) {
    return { success: false,status: res?.status };
  }
  const data = await res.json();
  if (data.message !== "DELETED") {
    return { success: false };
  }
  return { success: true, data: data.data?.comment as CommentType };
};

export const likeOrUnlikeTask = async (
  taskId: string,
  type: "LIKE" | "UNLIKE"
) => {
  const session = await getServerAuth();
  // if (!session) redirect("/auth/signin");
  const path = type == "LIKE" ? "like" : "unlike";
  const res = await fetch(`${BACKEND_URL}/task/${path}/${taskId}`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
    },
  });
  if (!res.ok) {
    return { success: false,status: res?.status };
  }
  const data = await res.json();
  if (data.message !== "UPDATED") {
    return { success: false };
  }
  return { success: true, data: data.data?.task as TaskType };
};
