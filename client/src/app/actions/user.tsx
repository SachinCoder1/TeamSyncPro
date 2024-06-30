"use server";

import { BACKEND_URL } from "@/config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/authOptions";
import { MyTasksType } from "@/types";

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
