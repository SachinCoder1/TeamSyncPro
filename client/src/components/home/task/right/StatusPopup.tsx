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

type Props = {
  status: string;
  label: string;
};
export default function StatusBarDropdown({ status, label }: Props) {
  const onValueChange = (val:string) => {
    console.log("value changed..", val)
  }

  return (
    <Select defaultValue={status} onValueChange={onValueChange}>
      <SelectTrigger
        className={cn(
          "min-w-[100px] w-max ",
          status === "todo" && "bg-secondary"
        )}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup onChange={(e) => console.log()}>
          {/* <SelectLabel>{label}</SelectLabel> */}
          <SelectItem className="bg-secondary" value={status}>{status}</SelectItem>
          <SelectItem className="bg-blue-500 hover:!bg-blue-600" value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
