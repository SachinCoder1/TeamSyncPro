import { getWorkspace } from "@/app/actions/workspace";
import HeadingCard from "@/components/home/HeadingCard";
import StarWorkspace from "@/components/home/workspace/StarWorkspace";
import StarButton from "@/components/ui/StarButton";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/typography";
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

  const { success, workspace } = await getWorkspace(params.workspace);
  if (success === false) {
    return notFound();
  }
  console.log("workspace: ", workspace);

  return (
    <div>
      page and the id is: {params.workspace}
      <Suspense fallback={<div>Loading...</div>}>
        {JSON.stringify(workspace, null, 2)}
      </Suspense>
      <div className="flex gap-x-2 items-center">
        <Heading variant="h4">
          {workspace?.name}
          {workspace?.personal === true && (
            <Badge className="ml-2" variant={"outline"}>
              Personal
            </Badge>
          )}
        </Heading>

        <StarWorkspace />
      </div>
      {/* <div className="mx-auto w-full"> */}
        <div className="w-4/6 flex justify-center gap-y-6 flex-col mx-auto">
          <HeadingCard heading={`Members (${workspace?.members.length})`}>
            child
          </HeadingCard>
          <HeadingCard heading="Projects">child</HeadingCard>
        </div>
      {/* </div> */}
    </div>
  );
}
