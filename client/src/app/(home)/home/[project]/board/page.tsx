import { getProject } from "@/app/actions/project";
import Board from "@/components/home/board";
import { getServerAuth } from "@/lib/auth";
import { Metadata } from "next";
import React from "react";
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
  const project = await getProject(params.project)
  return (
    <div className="mt-4">
      <Board project={project.project} workspaceId={session.user.workspace} projectId={params.project}  />
    </div>
  );
};

export default page;