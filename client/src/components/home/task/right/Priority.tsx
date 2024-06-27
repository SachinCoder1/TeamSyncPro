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
import { priorities } from "../../project/tasks/data/data";
import revalidateTagServer from "@/app/actions/actions";
import { updateTask } from "@/app/actions/task";
import { cn } from "@/lib/utils";

type Props = {
  taskId: string;
  priority: string;
};
export default function Priority({ taskId, priority }: Props) {
  const onValueChange = async (val: any) => {
    console.log("value changed..", val);
    const changeStatus = await updateTask(taskId, {
      priority: val,
    });
    if (changeStatus.success) {
      revalidateTagServer("task");
    }
  };

  return (
    <Select defaultValue={priority} onValueChange={onValueChange}>
      <SelectTrigger isArrow={false} className="min-w-[100px] w-fit">
        <div>
        <SelectValue placeholder="Priority" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>Fruits</SelectLabel> */}
          {priorities?.map((item) => (
            <SelectItem className="" key={item.value} value={item.value}>
                <div className="flex gap-x-2 items-center">

                {<item.icon color={item.color} className={`w-4 h-4`} />}
              {item.label}
                </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
