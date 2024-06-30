import { MyTasksType } from "@/types";
import React from "react";
import TasksList from "./TaskList";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleArrowRightIcon, PlusCircleIcon } from "lucide-react";
import { isAfter, isBefore, parseISO } from "date-fns";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  tasks?: MyTasksType[];
  workspaceId: string;
};

const MyTasks = ({ tasks, workspaceId }: Props) => {
  const now = new Date();

  return (
    <div>
      {/* {JSON.stringify(tasks, null, 2)} */}

      <Tabs defaultValue="upcoming">
        {" "}
        <div className="space-between flex items-center mx-4">
          <TabsList className="h-full">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <div className="ml-auto">
            <Link
              href={"/tasks"}
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "sm",
                }),
                "items-center"
              )}
            >
              <span>View all tasks</span>
              <CircleArrowRightIcon className="ml-2 mt-0.5 h-4 w-4" />
            </Link>
          </div>
        </div>
        <TabsContent value="upcoming">
          <TasksList
            workspaceId={workspaceId}
            tasks={tasks?.filter((task) => isAfter(task?.due || "", now))}
          />
        </TabsContent>
        <TabsContent value="overdue">
          <TasksList
            workspaceId={workspaceId}
            tasks={tasks?.filter((task) => isBefore(task?.due || "", now))}
          />
        </TabsContent>
        <TabsContent value="completed">
          <TasksList
            workspaceId={workspaceId}
            tasks={tasks?.filter((item) => item.done === true)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyTasks;
