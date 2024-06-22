import { getPerticularTask } from "@/app/actions/task";
import ResizableMain from "@/components/home/task";
import BreadcrumbMain from "@/components/home/task/BreadcrumbMain";
import LeftTaskContainer from "@/components/home/task/left";
import RightTaskContainer from "@/components/home/task/right";
import { Metadata } from "next";
import React, { Suspense } from "react";
export const metadata: Metadata = {
  title: "Task - TeamSyncPro",
  description: "A task and issue tracker build using Tanstack Table.",
};

type Props = {
  params: {
    workspace: string;
    project: string;
    task: string;
  };
};

export default async function Page({ params }: Props) {
  const taskData = await getPerticularTask(params.task, params.project);
  if (taskData.success === false) {
    return <>not found</>;
  }
  return (
    <div>
      task id: {params.task}
      <Suspense fallback={<div>Loading...</div>}>
        {JSON.stringify(taskData.task, null, 2)}
      </Suspense>
      <BreadcrumbMain />
      <ResizableMain
        left={<LeftTaskContainer task={taskData.task} />}
        right={<RightTaskContainer task={taskData.task} />}
      />
    </div>
  );
}
