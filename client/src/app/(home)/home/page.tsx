import { getMyTasks } from "@/app/actions/user";
import { getWorkspace } from "@/app/actions/workspace";
import MyTasks from "@/components/home/personal/MyTasks";
import Projects from "@/components/home/workspace/Projects";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/typography";
import { getServerAuth } from "@/lib/auth";
import { cn, getGreeting } from "@/lib/utils";
import { format } from "date-fns";
import { CheckIcon } from "lucide-react";
import React from "react";

const Card = ({ title, children,className }: any) => (
  <div className="border py-2 rounded-md hover:border-muted-foreground transition-all duration-150">
    <Heading className="font-normal px-4" variant="h4">
      {title}
    </Heading>
    <div className={cn("my-2", className)}>{children}</div>
  </div>
);

export default async function Page() {
  const session = await getServerAuth();
  const projects = await getWorkspace();
  const myTasks = await getMyTasks();
  return (
    <div className="mt-6 px-4">
      {/* <h1>Home</h1> */}
      {/* <p>Welcome {session.user.name}</p> */}
      {/* your workspace is {session.user.workspace} */}
      <div className="space-y-2 my-4">
        <Heading className="font-semibold">Home</Heading>
      </div>
      <div className="flex flex-col gap-y-1 items-center w-full">
        <Heading variant="h5" className="font-normal">
          {format(new Date(), "EEEE, MMMM d")}
        </Heading>
        <Heading variant="h2" className="font-normal">
          {getGreeting()}, {session.user.name}
        </Heading>
        <div className="rounded-2xl bg-secondary flex mt-6 gap-x-6 px-8 py-3 items-center">
          <Badge variant={"secondary"} className="text-muted-foreground">
            My week
          </Badge>{" "}
          <span className="text-muted-foreground">|</span>
          <div className="flex gap-x-1 items-center">
            <CheckIcon className="h-3 w-3 text-muted-foreground" />
            <p className="text-lg">{myTasks.data?.filter(task => task.done).length || 0}</p>
            <p className="text-sm text-muted-foreground">tasks completed</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 w-full gap-x-6 gapy-6 grid-cols-1 my-6">
        <Card title="My Tasks">
          <MyTasks tasks={myTasks?.data} workspaceId={session.user.workspace} />
        </Card>
          <Card title="Projects" className="px-6">
            <Projects
              workspaceId={session.user.workspace}
              projects={projects.workspace?.projects}
               className="grid md:grid-cols-2 grid-cols-1 gap-4"
            />
          </Card>
      </div>
    </div>
  );
}
