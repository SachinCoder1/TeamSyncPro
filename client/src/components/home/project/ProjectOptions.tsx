'use client'

import { Button } from "@/components/ui/button";
import { ChevronDown, Star } from "lucide-react";
import React, { useState } from "react";

type Props = {
    projectId?:string;
    color?:string;
};

function ProjectOptions({color,projectId}: Props) {
    const [isStarred, setIsStarred] = useState(false)
  return (
    <div className="">
      <Button variant={"ghost"} size={"icon"}>
        <ChevronDown color="#6d6e6f" className="my-1" />
      </Button>
      <Button onClick={() => setIsStarred(!isStarred)} variant={"ghost"} size={"icon"}>
        <Star
          fill={isStarred ? color : "transparent"}
          color={color}
        />
      </Button>
    </div>
  );
}

export default ProjectOptions;
