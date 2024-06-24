"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TaskType } from "@/types/project";
import { CircleCheckIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

type Props = {
  subtasks: TaskType[];
};
const SubTaskList = ({ subtasks }: Props) => {
  const params = useParams();
  const handleCompleteSubTask = (status: "COMPLETE" | "INCOMPLETE") => {
    if(status === "COMPLETE") {
        console.log("mark compelte");
    }

    if(status === "INCOMPLETE") {
        console.log("mark incomplete")
    }
  }
  return (
    <div>
      {subtasks
        .sort((a, b) => a.order - b.order)
        ?.map((item, index) => (
          <div
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-full !px-1 !text-left border-t-2 rounded-none flex justify-start gap-x-2 group"
            )}
          >
            {item.status === "COMPLETE" ? (
              <CircleCheckIcon
                onClick={() => handleCompleteSubTask("INCOMPLETE")}
                fill="#58a182"
                className="h-5 w-5 text-white rounded-full cursor-pointer"
              />
            ) : (
              <CircleCheckIcon
                onClick={() => handleCompleteSubTask("COMPLETE")}
                className="h-5 w-5 hover:text-[#0d7f56] hover:!fill-white rounded-full cursor-pointer"
              />
            )}
            <Link
              className={cn("py-2")}
              key={index + item._id}
              href={`/home/${params.workspace}/${params.project}/${item._id}`}
            >
              <div>{item.title}</div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default SubTaskList;
