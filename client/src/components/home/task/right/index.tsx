"use client";

import { TaskType } from "@/types/project";
import React from "react";
import StatusBarDropdown from "./StatusPopup";
import { Heading } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import TagsSelector from "./TagsSelector";
import { Label } from "@/components/ui/label";

type Props = {
  task?: TaskType;
};

const LabelValue = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className=" grid grid-cols-3 justify-between w-full items-start">
      <Label>{label}</Label>
      <div className="col-span-2">{children}</div>
    </div>
  );
};
const RightTaskContainer = ({ task }: Props) => {
  return (
    <div className="p-2">
      <StatusBarDropdown status="todo" label="status" />
      <div className="border my-4 rounded-md py-2">
        <div className=" py-2 space-y-2">
          <Heading className="py-1 px-2" variant="h6">
            Details
          </Heading>
          <Separator />
        </div>
        <div className="px-4 py-2 space-y-6">
          <LabelValue label="Assignee">hello</LabelValue>
          <LabelValue label="Tags">
            <TagsSelector />
          </LabelValue>
        </div>
      </div>
    </div>
  );
};

export default RightTaskContainer;
