import ProjectList from "@/components/home/project/List";
import { Metadata } from "next";
import React from "react";


type Props = {
  params: {
    workspace: string;
    project: string;
  };
};
export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};

export default function Page({params}: Props) {
  return (
    <>
      <ProjectList projectId={params.project} workspaceId={params.workspace} />
      </>
  );
}
