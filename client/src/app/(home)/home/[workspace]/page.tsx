import { BACKEND_URL } from "@/config";
import { getServerAuth } from "@/lib/auth";
import { isValidObjectId } from "@/lib/utils";
import { notFound, redirect } from "next/navigation";
import React, { Suspense } from "react";

type Props = {
  params: {
    workspace: string;
  };
};

export default async function page({ params }: Props) {
  const session = await getServerAuth();

  if (!isValidObjectId(params.workspace)) {
    return redirect(`/home/${session.user.workspace}`);
  }

  const res = await fetch(`${BACKEND_URL}/workspace/${params.workspace}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session.accessToken.token}`,
    },
  });

  if (!res.ok) {
    return notFound();
  }

  const workspace = await res.json();
  if (workspace.message !== "SUCCESS") {
    return notFound();
  }
  console.log("workspace: ", workspace);

  return (
    <div>
      page and the id is: {params.workspace}
      <Suspense fallback={<div>Loading...</div>}>
        {JSON.stringify(workspace?.data?.workspace, null, 2)}
      </Suspense>
    </div>
  );
}
