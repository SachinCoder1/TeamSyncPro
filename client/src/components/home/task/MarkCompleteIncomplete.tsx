"use client";

import revalidateTagServer from "@/app/actions/actions";
import { markCompleteIncomplete } from "@/app/actions/task";
import { Icons } from "@/components/Icon/Icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";

type Props = {
  tag: string;
  isCompleted: boolean;
};

const MarkCompleteIncomplete = ({ tag, isCompleted }: Props) => {
  const [loading, setLoading] = useState(false);
  const [markComplete, setMarkComplete] = useState(false);
  const params = useParams();
  const handleCompleteSubTask = async (status: "COMPLETE" | "INCOMPLETE") => {
    setLoading(true);
    if (status === "COMPLETE") {
      console.log("mark compelte");
      setMarkComplete(true);
      await markCompleteIncomplete(params.task as string, true);
    }

    if (status === "INCOMPLETE") {
      console.log("mark incomplete");
      setMarkComplete(false);
      await markCompleteIncomplete(params.task as string, false);
    }
    revalidateTagServer(tag);
    setTimeout(() => {
      setLoading(false);
    }, 100);
  };

  return (
    <Button
      disabled={loading}
      onClick={() =>
        handleCompleteSubTask(isCompleted === true ? "INCOMPLETE" : "COMPLETE")
      }
      variant={"outline"}
      className={cn(
        "!font-normal flex items-center gap-x-2",
        (isCompleted || markComplete === true) &&
          "bg-[#e6f8f1] text-[#0d7f56] border-[#8dc2ac] fill-[#58a182] hover:bg-[#e6f8f1] hover:text-[#0d7f56]"
      )}
    >
      {loading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <CircleCheck className="h-4 w-4" />
      )}

      {isCompleted || markComplete === true ? "Completed" : "Mark complete"}
    </Button>
  );
};

export default MarkCompleteIncomplete;
