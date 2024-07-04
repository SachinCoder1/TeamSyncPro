"use server";

import { BACKEND_URL } from "@/config";
import { getServerAuth } from "@/lib/auth";
import { onboardSchema } from "@/lib/zod-validation/onboard-schema";
import { onboardFormDataType } from "@/stores/onboarding-store";
import { redirect } from "next/navigation";

export const onboardUser = async (data: onboardFormDataType) => {
  const { success } = onboardSchema.safeParse(data);
  if (!success) return { error: "INVALID_DATA" };
  const session = await getServerAuth();
  const res = await fetch(BACKEND_URL + "/onboard", {
    method: "POST",
    body: JSON.stringify({
      projectName: data.project,
      tasks: data.tasks,
      sections: data.sections,
    }),
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
      "Content-Type": "application/json",
    },
  });
  const onboard = await res.json();
  // if (!onboard || onboard.message !== "SUCCESS") {
  //   return {error: onboard.message}
  // }

  if (onboard?.data) {
    redirect("/home");
  }
};
