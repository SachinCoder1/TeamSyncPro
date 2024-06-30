import { getMyTasks } from "@/app/actions/user";
import TasksList from "@/components/home/personal/TaskList";
import { UserAvatarCard, UserCard } from "@/components/home/workspace/Members";
import { Heading } from "@/components/ui/typography";
import { getServerAuth } from "@/lib/auth";
import React from "react";

type Props = {};

const Page = async (props: Props) => {
  const myTasks = await getMyTasks();
  const session = await getServerAuth();

  return (
    <div>
      <div className="flex gap-x-2 items-center mt-4 mb-8 px-2">
        <UserAvatarCard id={session.user.id} name={session.user.name} />
        <Heading variant="h5">
          {session.user.name} {" "}
          (My tasks)
        </Heading>
      </div>
      <TasksList workspaceId={session.user.workspace} tasks={myTasks.data} />
    </div>
  );
};

export default Page;
