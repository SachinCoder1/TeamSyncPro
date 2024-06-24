import { getPerticularTask, getSubTasks } from "@/app/actions/task";
import ResizableMain from "@/components/home/task";
import BreadcrumbMain from "@/components/home/task/BreadcrumbMain";
import MarkCompleteIncomplete from "@/components/home/task/MarkCompleteIncomplete";
import LeftTaskContainer from "@/components/home/task/left";
import RightTaskContainer from "@/components/home/task/right";
import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
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
  const taskData = getPerticularTask(params.task, params.project);
  const subTaskData = getSubTasks(params.task);
  const [tasks, subtasks] = await Promise.all([taskData, subTaskData]);
  console.log("subtasks: ", subtasks);
  if (tasks.success === false) {
    return <>not found</>;
  }
  return (
    <div>
      task id: {params.task}
      <Suspense fallback={<div>Loading...</div>}>
        {JSON.stringify(tasks.task, null, 2)}
      </Suspense>
      <BreadcrumbMain />
      <div className="ml-4">

      <MarkCompleteIncomplete
        tag="task"
        isCompleted={tasks.task?.status === "COMPLETE"}
        />
        </div>
      <ResizableMain
        left={<LeftTaskContainer task={tasks.task} subtasks={subtasks?.data} />}
        right={<RightTaskContainer task={tasks.task} />}
      />
    </div>
  );
}
