import { Heading } from "@/components/ui/typography";
import { TaskType } from "@/types/project";
import React from "react";

type Props = {
  task?: TaskType;
};

const LeftTaskContainer = ({ task }: Props) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Heading>{task?.title}</Heading>
        <Heading variant="h6">Description</Heading>
      </div>

      <div>
        <Heading variant="h6">Activity</Heading>
      </div>
    </div>
  );
};

export default LeftTaskContainer;
