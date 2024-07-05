import { getInvites } from "@/app/actions/invite";
import { isStarred } from "@/app/actions/user";
import { getWorkspace } from "@/app/actions/workspace";
import HeadingCard from "@/components/home/HeadingCard";
import InvitedMembers from "@/components/home/workspace/InvitedMembers";
import Members from "@/components/home/workspace/Members";
import Projects from "@/components/home/workspace/Projects";
import StarWorkspace from "@/components/home/workspace/StarWorkspace";
import StarButton from "@/components/ui/StarButton";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/typography";
import { getServerAuth } from "@/lib/auth";
import { isValidObjectId } from "@/lib/utils";
import { ProjectType } from "@/types/project";
import { notFound, redirect } from "next/navigation";
import React, { Suspense } from "react";
import Loading from "../home/[project]/loading";

// type Props = {
//   params: {
//     workspace: string;
//   };
// };

export default async function page() {
  const session = await getServerAuth();

//   if (!isValidObjectId(session.user.workspace)) {
//     return redirect(`/home/${session.user.workspace}`);
//   }

  const { success, workspace } = await getWorkspace();
  if (success === false) {
    // return notFound();
  }

  const invitations = await getInvites(session.user.workspace)
  const isWorkspaceStarred = await isStarred(session.user.workspace, "workspace")

  return (
    <div>
      {/* page and the id is: {session.user.workspace} */}
      <Suspense fallback={<div><Loading /></div>}>
        {/* {JSON.stringify(isWorkspaceStarred, null, 2)} */}
      <div className="flex gap-x-2 items-center">
        <Heading variant="h4">
          {workspace?.name}
          {workspace?.personal === true && (
            <Badge className="ml-2" variant={"outline"}>
              Personal
            </Badge>
          )}
        </Heading>

        <StarWorkspace isStarred={isWorkspaceStarred.data} workspaceId={workspace?._id as string} />
      </div>
      {/* <div className="mx-auto w-full"> */}
      <div className="w-3/6 flex justify-center gap-y-6 flex-col mx-auto mt-6">
        <HeadingCard
          className="px-4"
          heading={`Members (${workspace?.members.length})`}
        >
          <Members workspaceId={workspace?._id as string} workspaceName={workspace?.name} members={workspace?.members} />
        </HeadingCard>
        <HeadingCard heading="Projects">
          <Projects
            workspaceId={session.user.workspace}
            projects={workspace?.projects as ProjectType[] | undefined}
          />
        </HeadingCard>
        <HeadingCard heading="Invited people">
          <InvitedMembers  invitedMembers={invitations?.data} />
        </HeadingCard>
      </div>
      {/* </div> */}
      </Suspense>

    </div>
  );
}
