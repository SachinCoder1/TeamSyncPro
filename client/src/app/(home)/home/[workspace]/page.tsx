import { getWorkspace } from "@/app/actions/workspace";
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

  const {success,workspace} = await getWorkspace(params.workspace);
  // if (success === false) {
  //   return notFound();
  // }
  console.log("workspace: ", workspace);

  return (
    <div>
      page and the id is: {params.workspace}
      <Suspense fallback={<div>Loading...</div>}>
        {JSON.stringify(workspace, null, 2)}
      </Suspense>
    </div>
  );
}
