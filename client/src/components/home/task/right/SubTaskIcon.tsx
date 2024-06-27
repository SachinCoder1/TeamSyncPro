"use client";

import { Button } from "@/components/ui/button";
import { useSubTaskOpenerStore } from "@/stores/subtask-opener-store";
import { NetworkIcon } from "lucide-react";
import React from "react";

type Props = {};

const SubTaskIcon = (props: Props) => {
  const { setIsEditing } = useSubTaskOpenerStore();
  return (
    <Button
      onClick={() => setIsEditing(true)}
      variant={"ghost"}
      size={"icon"}
      className="!m-0 !p-0"
    >
      <NetworkIcon className="h-5 w-5 cursor-pointer" />
    </Button>
  );
};

export default SubTaskIcon;
