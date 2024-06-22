import { getPerticularTask } from "@/app/actions/task";
import { Metadata } from "next";
import React, { Suspense } from "react";
export const metadata: Metadata = {
  title: "List View - TeamSyncPro",
  description: "A task and issue tracker build using Tanstack Table.",
};

type Props = {
  params: {
    workspace: string;
    project: string;
    task: string;
  };
};

export default async function Page({params}:Props) {
   const taskData = await getPerticularTask(params.task, params.project)
   if(taskData.success === false){
    return <>not found</>
   }
  return (
    <div>
      task id: {params.task}
      <Suspense fallback={<div>Loading...</div>}>
        {JSON.stringify(taskData.task, null, 2)}
      </Suspense>

    </div>
  );
};
