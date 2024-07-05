import { getProject } from "@/app/actions/project";
import Board from "@/components/home/board";
import { getServerAuth } from "@/lib/auth";
import { Metadata } from "next";
import React, { Suspense } from "react";
import Loading from "../loading";
export const metadata: Metadata = {
  title: "Dashboard - TeamSyncPro",
  description: "A task and issue tracker build using Tanstack Table.",
};

type Props = {
  params: {
    workspace: string;
    project: string;
    task: string;
  };
};

const page = async ({ params }: Props) => {
  const session = await getServerAuth();
  const project = await new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 20000000);
  })
  return (
    <div className="mt-4">
      <Suspense fallback={<Loading />}>

hello
      {/* <Board project={project.project} workspaceId={session.user.workspace} projectId={params.project}  /> */}
      </Suspense>
    </div>
  );
};

export default page;