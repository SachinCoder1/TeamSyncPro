"use client";

import { useSubTaskOpenerStore } from "@/stores/subtask-opener-store";
import { NetworkIcon } from "lucide-react";
import React from "react";

type Props = {};

const SubTaskIcon = (props: Props) => {
  const { setIsEditing } = useSubTaskOpenerStore();
  return (
    <NetworkIcon
      onClick={() => setIsEditing(true)}
      className="h-5 w-5 cursor-pointer"
    />
  );
};

export default SubTaskIcon;
