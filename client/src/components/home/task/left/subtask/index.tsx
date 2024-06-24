import React from "react";
import SubTaskHandler from "./SubTaskHandler";
import { TaskType } from "@/types/project";
import Link from "next/link";
import SubTaskList from "./SubTaskList";

type Props = {
  subtasks: TaskType[];
  taskId: string;
};

const SubTasks = ({ taskId, subtasks }: Props) => {
  return (
    <div>
      {/* {JSON.stringify(subtasks, null, 2)} */}
      <p className="text-sm mb-1">Subtasks</p>
      <SubTaskList subtasks={subtasks} />
      <div className="w-full my-2">

      <SubTaskHandler taskId={taskId} />
      </div>
    </div>
  );
};

export default SubTasks;
