"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { StatusType, TaskType } from "@/types/project";
import useSWR from "swr";
import { getAllStatus } from "@/app/actions/project";
import { useParams } from "next/navigation";
import { changeTaskStatus } from "@/app/actions/task";
import revalidateTagServer from "@/app/actions/actions";

type Props = {
  status?: {
    sectionId: string;
    title: string;
  };
  taskId: string;
  label?: string;
};
export default function StatusBarDropdown({ status,taskId }: Props) {
  console.log("status:", status)
  const params = useParams();
  const { data, error, isLoading } = useSWR<{
    success: boolean;
    data?: StatusType[];
  }>(
    params.project ? `/status/${params.project}` : null,
    () => getAllStatus(params.project as string),
    // { revalidateOnFocus: false, revalidateOnMount: false }
  );
  const onValueChange = async (val: string) => {
    console.log("value changed..", val);
    const changeStatus = await changeTaskStatus(taskId as string, val);
    if (changeStatus.success) {
      revalidateTagServer("task");
      revalidateTagServer("project")
    }
  };

  return (
    <Select defaultValue={status?.sectionId} onValueChange={onValueChange}>
      <SelectTrigger
        className={cn(
          "min-w-[100px] w-max ",
          status?.title === "todo" && "bg-secondary"
        )}
      >
        <SelectValue placeholder="status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>{label}</SelectLabel> */}
          {data?.data?.map((item) => (
            <SelectItem className="text-left" key={item._id} value={item._id}>
              {item.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
