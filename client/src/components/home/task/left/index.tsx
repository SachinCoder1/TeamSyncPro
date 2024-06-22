import { Heading } from "@/components/ui/typography";
import { TaskType } from "@/types/project";
import React from "react";

type Props = {
  task?: TaskType;
};

const LeftTaskContainer = ({ task }: Props) => {
  return (
    <div>
      <Heading>{task?.title}</Heading>
    </div>
  );
};

export default LeftTaskContainer;
