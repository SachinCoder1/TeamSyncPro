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

type Props = {
  task?: TaskType;
};

const LeftTaskContainer = async ({ task }: Props) => {
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

      <div>
        <Button size={"sm"} className="!font-normal" variant={"outline"}>
          <PlusIcon className="h-4 w-4 !font-normal" /> Add Subtask
        </Button>
      </div>

      <div className="space-y-4">
        <Heading variant="h6">Activity</Heading>
        <Comments taskId={task?._id as any} />
      </div>
    </div>
  );
};

export default LeftTaskContainer;
