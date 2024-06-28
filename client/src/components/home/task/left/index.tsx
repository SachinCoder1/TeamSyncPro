import { updateTask } from "@/app/actions/task";
import { Heading, headingClasses } from "@/components/ui/typography";
import { TaskType } from "@/types/project";
import React from "react";
import DescriptionHandler from "../../project/DescriptionHandler";
import { Label } from "@/components/ui/label";
import Comments from "./comment/Comments";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import DynamicInputHandler from "@/components/DynamicInputHandler";
import { cn } from "@/lib/utils";
import SubTasks from "./subtask";
import { LabelValue } from "../right";
import Dependency from "./Dependency";
import { getProject } from "@/app/actions/project";

type Props = {
  task?: TaskType;
  subtasks?: TaskType[];
  projectId?: string;
  workspaceId: string;
};

const LeftTaskContainer = async ({projectId ,task, subtasks,workspaceId }: Props) => {
  const data = await getProject(projectId);
  const suggestions = data?.project?.sections.flatMap((project) =>
    project.tasks
      .filter((localTask) => localTask.done === false && localTask._id !== task?._id)
      .map((task) => ({
        label: task.title || "NA",
        value: task._id || "NA",
      }))
  );
    
  // suggestions?.sort((a, b) => a.order - b.order); 

   return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="">
          <DynamicInputHandler
            className={cn(headingClasses["h3"])}
            defaultValue={task?.title as string}
            fieldName="title"
            id="task"
            tag="task"
            updateFunction={updateTask}
          />
        </div>
        <div>
          <p className="text-sm mb-1 px-2">Description</p>

          {/* <Label className="px-2 my-1">Description</Label> */}
          <DescriptionHandler
            description={task?.description}
            field="description"
            id="task"
            revalidateTag="task"
            updateFunction={updateTask}
            placeholder="What's this task is about?"
          />
        </div>
      </div>

      <div>
        <SubTasks
          taskId={task?._id as string}
          subtasks={subtasks as TaskType[]}
        />
      </div>

      <div
        className={cn(" grid grid-cols-4 justify-between w-full items-baseline")}
      >
        <Label>Dependency</Label>
        <div
          className={cn(
            `col-span-3`,
            "" // cursor-pointer hover:bg-secondary px-2 py-0.5
          )}
        >
          <Dependency workspaceId={workspaceId} dependency={task?.dependency} taskId={task?._id as string} projectId={projectId as string} suggestions={suggestions} />
        </div>
      </div>

      <div className="space-y-4">
        <Heading variant="h6">Activity</Heading>
        <Comments taskId={task?._id as any} />
      </div>
    </div>
  );
};

export default LeftTaskContainer;
