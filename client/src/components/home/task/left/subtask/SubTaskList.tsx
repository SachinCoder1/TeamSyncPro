"use client";

import revalidateTagServer from "@/app/actions/actions";
import { markCompleteIncomplete } from "@/app/actions/task";
import { buttonVariants } from "@/components/ui/button";
import { fireConfetti } from "@/components/workspace/NewWorkspace";
import { cn } from "@/lib/utils";
import { TaskType } from "@/types/project";
import { ChevronRight, CircleCheckIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";

type Props = {
  subtasks: TaskType[];
};
const SubTaskList = ({ subtasks }: Props) => {
  const [markComplete, setMarkComplete] = useState({ id: "", mark: false });
  const params = useParams();
  const handleCompleteSubTask = async (
    status: "COMPLETE" | "INCOMPLETE",
    id: string
  ) => {
    if (status === "COMPLETE") {
      setMarkComplete({
        id,
        mark: true,
      });
      await markCompleteIncomplete(id, true);
      fireConfetti()
    }

    if (status === "INCOMPLETE") {
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
      {subtasks
        .sort((a, b) => a.order - b.order)
        ?.map((item, index) => (
          <div
            key={index + item._id}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-full !px-1 !text-left border-t rounded-none flex justify-between gap-x-2 group"
            )}
          >
            <div className="flex gap-x-2 items-center">
              {item.done === true ||
              (item._id === markComplete.id && markComplete.mark) ? (
                <CircleCheckIcon
                  onClick={() => handleCompleteSubTask("INCOMPLETE", item._id)}
                  size={25}
                  className="-ml-0.5 text-background fill-[#58a182] rounded-full cursor-pointer"
                />
              ) : (
                <CircleCheckIcon
                  size={20}
                  onClick={() => handleCompleteSubTask("COMPLETE", item._id)}
                  className="hover:text-[#0d7f56] hover:!fill-background rounded-full cursor-pointer text-muted-foreground"
                />
              )}
              <Link
                className={cn("py-2")}
                href={`/home/${params.project}/${item._id}`}
              >
                <div>{item.title}</div>
              </Link>
            </div>
            <Link
              href={`/home/${params.project}/${item._id}`}
              className="transition-all duration-150 scale-0 group-hover:scale-100 hover:!scale-110 cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        ))}
    </div>
  );
};

export default SubTaskList;
