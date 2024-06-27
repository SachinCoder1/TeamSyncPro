"use client";

import { TaskType } from "@/types/project";
import React from "react";
import StatusBarDropdown from "./StatusPopup";
import { Heading } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import TagsSelector from "./TagsSelector";
import { Label } from "@/components/ui/label";
import TeamSwitcher from "./TeamSwitcher";
import LikeHandler from "./LikeTask";
import AttachFiles from "./AttachFiles";
import SubTaskIcon from "./SubTaskIcon";
import { ShareProject } from "../../project/ShareProject";
import { Button } from "@/components/ui/button";
import { Share2Icon, ShareIcon } from "lucide-react";
import OtherOptions from "./OtherOptions";
import { useSession } from "next-auth/react";
import DueDate from "./DueDate";
import { cn } from "@/lib/utils";

type Props = {
  task?: TaskType;
};

const LabelValue = ({
  label,
  children,
  className,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className=" grid grid-cols-3 justify-between w-full items-center">
      <Label>{label}</Label>
      <div
        className={cn(
          `col-span-2 cursor-pointer hover:bg-secondary px-2 py-0.5`,
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
const RightTaskContainer = ({ task }: Props) => {
  const { data: user } = useSession();
  console.log("user.", user?.user.id);
  if (!task) return <>Loading...</>;
  return (
    <div className="p-2">
      <div className="flex justify-between w-full">
        <StatusBarDropdown status={task?.status} label="status" />
        <div className="flex items-center">
          <LikeHandler
            likesCount={task?.likedBy.length}
            taskId={task._id}
            isLiked={!!task?.likedBy?.includes(user?.user.id as string)}
          />
          <AttachFiles />
          <SubTaskIcon />
          <ShareProject
            btnTrigger={
              <Button variant={"ghost"} size={"icon"}>
                <Share2Icon className="w-5 h-5" />
              </Button>
            }
          />
          <OtherOptions taskTitle={task.title} />
        </div>
      </div>
      <div className="border my-4 rounded-md py-2">
        <div className=" py-2 space-y-2">
          <Heading className="py-1 px-2" variant="h6">
            Details
          </Heading>
          <Separator />
        </div>
        <div className="px-4 py-2 space-y-6">
          <LabelValue label="Assignee">
            <TeamSwitcher />
          </LabelValue>
          <LabelValue label="Tags">
            <TagsSelector />
          </LabelValue>
          <LabelValue label="Reporter">
            <TeamSwitcher />
          </LabelValue>
          <div className=" grid grid-cols-3 justify-between w-full items-center">
            <Label>{"Due date"}</Label>
            <div className={cn(`col-span-2`)}>
              <DueDate taskId={task._id} dueDate={task.due} />
            </div>
          </div>
          {/* <LabelValue label="Due date" className="!px-0 !py-0 rounded-md hover:!bg-none">
            <DueDate taskId={task._id} dueDate={task.due} />
          </LabelValue> */}
          <LabelValue label="Priority">
            {/* <TeamSwitcher /> */}
            priority
          </LabelValue>
          <LabelValue label="Story Points">
            {/* <TeamSwitcher /> */}
            Number
          </LabelValue>
          <LabelValue label="Dependency">
            {/* <TeamSwitcher /> */}
            Number
          </LabelValue>
        </div>
      </div>
    </div>
  );
};

export default RightTaskContainer;
