import { updateTask } from "@/app/actions/task";
import { Heading } from "@/components/ui/typography";
import { TaskType } from "@/types/project";
import React from "react";
import DescriptionHandler from "../../project/DescriptionHandler";
import { Label } from "@/components/ui/label";
import Comments from "./comment/Comments";

type Props = {
  task?: TaskType;
};

const LeftTaskContainer = async ({ task }: Props) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="px-2">
          <Heading>{task?.title}</Heading>
        </div>
        <div>
          <Label className="px-2 my-1">Description</Label>
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

      <div className="space-y-4">
        <Heading variant="h6">Activity</Heading>
        <Comments taskId={task?._id as any} />
      </div>
    </div>
  );
};

export default LeftTaskContainer;
