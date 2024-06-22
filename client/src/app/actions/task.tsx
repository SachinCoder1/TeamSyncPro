"use server";

import { BACKEND_URL } from "@/config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/authOptions";
import { ProjectType, TaskType } from "@/types/project";

export const markCompleteIncomplete = async (taskId?: string, mark?:boolean ) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");
  let todo = mark ? "mark-complete" : "mark-incomplete"
  const res = await fetch(`${BACKEND_URL}/task/${todo}/${taskId}`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
    },
    // next: {tags: ['project']}
  });
  console.log("todo:", todo,"res:", res,)
  if (!res.ok) {
    return { success: false };
  }
  const data = await res.json();
  console.log("complete/incomplete data:",todo, data)
  if (data.message !== "UPDATED") {
    return { success: false };
  }
  return { success: true, data: data.data as ProjectType };
};

export const getPerticularTask = async (taskId: string,projectId:string) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");
  console.log("task:", taskId)
  const res = await fetch(`${BACKEND_URL}/task/get/${projectId}/${taskId}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
    },
    // next: {tags: ['project']}
  });
  console.log("data", res)
  if (!res.ok) {
    return { success: false };
  }
  const data = await res.json();
  console.log("task data:", data)
  if (data.message !== "SUCCESS") {
    return { success: false };
  }
  return { success: true, task: data.data?.task as TaskType };
};