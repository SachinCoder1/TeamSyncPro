import { getPerticularTask, getSubTasks } from "@/app/actions/task";
import { getTags, getWorkspace } from "@/app/actions/workspace";
import ResizableMain from "@/components/home/task";
import BreadcrumbMain from "@/components/home/task/BreadcrumbMain";
import MarkCompleteIncomplete from "@/components/home/task/MarkCompleteIncomplete";
import LeftTaskContainer from "@/components/home/task/left";
import RightTaskContainer from "@/components/home/task/right";
import { Button } from "@/components/ui/button";
import { getServerAuth } from "@/lib/auth";
import { CircleCheck } from "lucide-react";
import { Metadata } from "next";
import React, { Suspense } from "react";
import Loading from "../loading";
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
  const session = await getServerAuth();
  const taskData = getPerticularTask(params.task, params.project);
  const subTaskData = getSubTasks(params.task);
  const tagsData = getTags()
  const workspaceData = getWorkspace();
  const [tasks, subtasks,tags, workspace] = await Promise.all([taskData, subTaskData, tagsData,workspaceData]);
  if (tasks.success === false) {
    return <>not found</>;
  }
  return (
    <div>
      <Suspense fallback={<div><Loading /></div>}>
        {/* {JSON.stringify(tasks.task, null, 2)} */}
        <BreadcrumbMain params={params} />
        <div className="ml-4 mt-4">
          <MarkCompleteIncomplete
            tag="task"
            isCompleted={tasks.task?.done as boolean}
          />
        </div>
        <ResizableMain
          left={
            <LeftTaskContainer workspaceId={session.user.workspace} projectId={params.project} task={tasks.task} subtasks={subtasks?.data} />
          }
          right={<RightTaskContainer workspaceId={session.user.workspace} workspaceName={workspace.workspace?.name} task={tasks.task} tags={tags.data} members={workspace.workspace?.members} />}
        />
      </Suspense>
    </div>
  );
}
