'use client'

import { Button } from "@/components/ui/button";
import { ChevronDown, Star } from "lucide-react";
import React, { useState } from "react";

type Props = {
    workspaceId?:string;
};

function StarWorkspace({}: Props) {
    const [isStarred, setIsStarred] = useState(false)
  return (
    <div className="">
      {/* <Button variant={"ghost"} size={"icon"}>
        <ChevronDown color="#6d6e6f" className="my-1" />
      </Button> */}
      <Button onClick={() => setIsStarred(!isStarred)} variant={"ghost"} size={"icon"}>
        <Star
          fill={isStarred ? "#fcbd01" : "transparent"}
          color={"#fcbd01"}
        />
      </Button>
    </div>
  );
}

export default StarWorkspace;