'use client'

import revalidateTagServer from "@/app/actions/actions";
import { starUnstarWorkspace } from "@/app/actions/user";
import { Button } from "@/components/ui/button";
import { ChevronDown, Star } from "lucide-react";
import React, { useState } from "react";

type Props = {
    workspaceId?:string;
    isStarred?: boolean
};

function StarWorkspace({isStarred:isWorkspaceStarred,workspaceId}: Props) {
    // const [isStarred, setIsStarred] = useState(false)
    const [optimiticStar, setOptimiticStar] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleWorkspaceStar = async () => {
      setLoading(true);
      if (isWorkspaceStarred) {
        setOptimiticStar(false);
      } else {
        setOptimiticStar(true);
      }
      const isStarred = await starUnstarWorkspace(
        workspaceId as string,
        isWorkspaceStarred ? "UNSTAR" : "STAR"
      );
      if (isStarred.success) {
        revalidateTagServer("isStarred");
      }
      setLoading(false);
    };
  
  return (
    <div className="">
      {/* <Button variant={"ghost"} size={"icon"}>
        <ChevronDown color="#6d6e6f" className="my-1" />
      </Button> */}
      <Button disabled={loading} onClick={handleWorkspaceStar} variant={"ghost"} size={"icon"}>
        <Star
          fill={(isWorkspaceStarred || optimiticStar) ? "#fcbd01" : "transparent"}
          color={"#fcbd01"}
        />
      </Button>
    </div>
  );
}

export default StarWorkspace;