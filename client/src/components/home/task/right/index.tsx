import { TagType, TaskType } from "@/types/project";
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
import StoryPoints from "./StoryPoints";
import Priority from "./Priority";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { getTags, getWorkspace } from "@/app/actions/workspace";
import { MembersType } from "@/types";
import { getServerAuth } from "@/lib/auth";
import Loading from "@/app/(home)/home/[project]/loading";

type Props = {
  task?: TaskType;
  tags?: TagType[];
  members?: MembersType[];
  workspaceId?: string;
  workspaceName?: string;
};

export const LabelValue = ({
  label,
  children,
  className,
  isOtherClasses = true,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
  isOtherClasses?: boolean;
}) => {
  return (
    <div
      className={cn(
        " grid grid-cols-3 justify-between w-full items-center",
        className
      )}
    >
      <Label>{label}</Label>
      <div
        className={cn(
          `col-span-2`,
          isOtherClasses && "cursor-pointer hover:bg-secondary px-2 py-0.5"
        )}
      >
        {children}
      </div>
    </div>
  );
};

type GroupType = {
  label: string;
  teams: {
    label: string;
    value: string;
    members?: MembersType[]; // Optional members array
  }[];
};

const RightTaskContainer = async ({
  task,
  tags,
  members,
  workspaceId,
  workspaceName,
}: Props) => {
  // const { data: user } = useSession();
  const user = await getServerAuth();
  // const tags = await getTags();
  // const members = await getWorkspace(session.user.workspace);
  const suggestions = tags?.map((item, index) => ({
    label: item.name,
    value: item._id,
  }));

  const finalGroup = [
    {
      label: "Personal Account",
      teams: [
        {
          label: user?.user.name, // Use the user's name for the personal account label
          value: user?.user.id,
        },
      ],
    },
    {
      label: "Teams",
      teams: members
        ?.filter(item => item._id !== user?.user?.id) // Filter out the item with user.id
        .map(item => ({
          label: item.name,
          value: item._id,
        })) || [], // Ensure it's an empty array if members is undefined
    },
  ];
  
  if (!task) return <>loading...</>;
  return (
    <div className="p-2">
      <div className="flex justify-between w-full">
        <StatusBarDropdown
          status={task?.status}
          taskId={task._id}
          label="status"
        />
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
            <TeamSwitcher
              workspaceId={workspaceId as string}
              workspaceName={workspaceName as string}
              members={finalGroup}
              taskId={task._id}
              assignee={task.assignee ? {label: task.assignee.name, value: task.assignee._id} : undefined}

            />
          </LabelValue>
          <LabelValue label="Tags">
            {user?.user.workspace && (
              <TagsSelector
                tags={task.tags}
                suggestions={suggestions}
                taskId={task._id}
                workspaceId={user?.user.workspace as string}
              />
            )}
          </LabelValue>
          <LabelValue label="Reporter">
            <TeamSwitcher
              workspaceId={workspaceId as string}
              workspaceName={workspaceName as string}
              members={finalGroup}
              taskId={task._id}
              assignee={task.taskCreator ? {label: task.taskCreator.name, value: task.taskCreator._id} : undefined}

            />
          </LabelValue>
          {/* <div className=" grid grid-cols-3 justify-between w-full items-center">
            <Label>{"Due date"}</Label>
            <div className={cn(`col-span-2`)}>
              <DueDate taskId={task._id} dueDate={task.due} />
            </div>
          </div> */}
          <LabelValue
            label="Due date"
            isOtherClasses={false}
            className="!items-center"
          >
            <DueDate taskId={task._id} dueDate={task.due} />
          </LabelValue>
          <LabelValue label="Priority" isOtherClasses={false}>
            {/* <TeamSwitcher /> */}
            <Priority taskId={task._id} priority={task.priority} />
          </LabelValue>
          <LabelValue label="Story Points" isOtherClasses={false}>
            {/* <TeamSwitcher /> */}
            <StoryPoints taskId={task._id} point={task.storyPoints} />
          </LabelValue>
          {/* <LabelValue label="Dependency">
            dependency
          </LabelValue> */}
        </div>
      </div>
    </div>
  );
};

export default RightTaskContainer;
