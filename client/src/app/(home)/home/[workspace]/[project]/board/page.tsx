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

const page = ({ params }: Props) => {
  return (
    <div>
      <Board />
    </div>
  );
};

export default page;