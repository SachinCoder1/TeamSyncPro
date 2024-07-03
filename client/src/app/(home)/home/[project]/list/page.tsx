import ProjectList from "@/components/home/project/List";
import { getServerAuth } from "@/lib/auth";
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

export default async function Page({params}: Props) {
const session = await getServerAuth();
  return (
    <>
      <ProjectList projectId={params.project} />
      </>
  );
}
