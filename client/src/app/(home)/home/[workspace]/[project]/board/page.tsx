import { getProject } from "@/app/actions/project";
import Board from "@/components/home/board";
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
  const project = await getProject(params.project)
  return (
    <div>
      <Board project={project.project}  />
    </div>
  );
};

export default page;