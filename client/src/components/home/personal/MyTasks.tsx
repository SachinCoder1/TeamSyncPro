import { MyTasksType } from "@/types";
import React from "react";
import TasksList from "./TaskList";

import { Button } from "@/components/ui/button";
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
import { PlusCircleIcon } from "lucide-react";
import { isAfter, isBefore, parseISO } from "date-fns";

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
            {/* <Button variant={"outline"} size={"sm"}>
              <PlusCircleIcon className="mr-2 h-4 w-4" />
              Create task
            </Button> */}
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
