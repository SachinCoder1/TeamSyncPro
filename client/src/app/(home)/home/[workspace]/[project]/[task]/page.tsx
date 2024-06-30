import { getPerticularTask, getSubTasks } from "@/app/actions/task";
import { getTags, getWorkspace } from "@/app/actions/workspace";
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
  const tagsData = getTags()
  const workspaceData = getWorkspace(params.workspace);
  const [tasks, subtasks,tags, workspace] = await Promise.all([taskData, subTaskData, tagsData,workspaceData]);
  console.log("subtasks: ", subtasks);
  if (tasks.success === false) {
    return <>not found</>;
  }
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {JSON.stringify(tasks.task, null, 2)}
        <BreadcrumbMain params={params} />
        <div className="ml-4 mt-4">
          <MarkCompleteIncomplete
            tag="task"
            isCompleted={tasks.task?.done as boolean}
          />
        </div>
        <ResizableMain
          left={
            <LeftTaskContainer workspaceId={params.workspace} projectId={params.project} task={tasks.task} subtasks={subtasks?.data} />
          }
          right={<RightTaskContainer workspaceId={workspace.workspace?._id} workspaceName={workspace.workspace?.name} task={tasks.task} tags={tags.data} members={workspace.workspace?.members} />}
        />
      </Suspense>
    </div>
  );
}
