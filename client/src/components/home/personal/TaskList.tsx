"use client";

import revalidateTagServer from "@/app/actions/actions";
import { markCompleteIncomplete } from "@/app/actions/task";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MyTasksType } from "@/types";
import { TaskType } from "@/types/project";
import { ChevronRight, CircleCheckIcon, PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  tasks?: MyTasksType[];
  workspaceId: string;
};
const TasksList = ({ tasks, workspaceId }: Props) => {
  const [markComplete, setMarkComplete] = useState({ id: "", mark: false });
  const params = useParams();
  const handleCompleteSubTask = async (
    status: "COMPLETE" | "INCOMPLETE",
    id: string
  ) => {
    if (status === "COMPLETE") {
      console.log("mark compelte");
      setMarkComplete({
        id,
        mark: true,
      });
      await markCompleteIncomplete(id, true);
    }

    if (status === "INCOMPLETE") {
      console.log("mark incomplete");
      setMarkComplete({
        id,
        mark: false,
      });
      await markCompleteIncomplete(id, false);
    }
    revalidateTagServer("subtasks");
  };
  return (
    <div>
      {!tasks ||
        (tasks.length <= 0 && (
          <div className="flex flex-col items-center p-6 rounded-lg">
            <h2 className="mb-2 text-xl font-semibold text-gray-700">
              No Tasks Found
            </h2>
            <p className="text-gray-500">
              You have no tasks at the moment. Enjoy your free time!
            </p>
            {/* <Button variant={"outline"} size={"sm"}>
              <PlusCircleIcon className="mr-2 h-4 w-4" />
              Create task
            </Button> */}
          </div>
        ))}
      {tasks
        ?.sort((a, b) => a.order - b.order)
        ?.map((item, index) => (
          <div
            key={index + item._id}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-full !text-left border-t rounded-none flex justify-between gap-x-2 group"
            )}
          >
            <div className="flex gap-x-2 items-center">
              {item.done === true ||
              (item._id === markComplete.id && markComplete.mark) ? (
                <CircleCheckIcon
                  onClick={() => handleCompleteSubTask("INCOMPLETE", item._id)}
                  // fill="#58a182"
                  className="h-6 w-6 -ml-0.5 text-white fill-[#58a182] rounded-full cursor-pointer"
                />
              ) : (
                <CircleCheckIcon
                  onClick={() => handleCompleteSubTask("COMPLETE", item._id)}
                  className="h-5 w-5 hover:text-[#0d7f56] hover:!fill-white rounded-full cursor-pointer"
                />
              )}
              <Link
                className={cn("py-2")}
                href={`/home/${item.project._id}/${item._id}`}
              >
                <div>{item.title}</div>
              </Link>
            </div>
            <div className="flex gap-x-4">
              <TooltipProvider delayDuration={250}>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href={`/home/${item.project._id}`}>
                      <Badge
                        style={{
                          backgroundColor: item.project.color,
                        }}
                      >
                        {item.project.name}
                      </Badge>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click to view all tasks in {item.project.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Link
                href={`/home/${item.project._id}/${item._id}`}
                className="transition-all duration-150 scale-0 group-hover:scale-100 hover:!scale-110 cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TasksList;
