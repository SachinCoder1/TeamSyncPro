"use client";

import revalidateTagServer from "@/app/actions/actions";
import { starUnstarProject } from "@/app/actions/user";
import { Button } from "@/components/ui/button";
import { ChevronDown, Star } from "lucide-react";
import React, { useState } from "react";

type Props = {
  projectId?: string;
  color?: string;
  isStarred?: boolean;
};

function ProjectOptions({
  color,
  projectId,
  isStarred: isProjectStarred,
}: Props) {
  const [optimiticStar, setOptimiticStar] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleProjectStar = async () => {
    setLoading(true);
    if (isProjectStarred) {
      setOptimiticStar(false);
    } else {
      setOptimiticStar(true);
    }
    const isStarred = await starUnstarProject(
      projectId as string,
      isProjectStarred ? "UNSTAR" : "STAR"
    );
    if (isStarred.success) {
      revalidateTagServer("isStarred");
    }
    setLoading(false);
  };
  return (
    <div className="">
      <Button variant={"ghost"} size={"icon"}>
        <ChevronDown color="#6d6e6f" className="my-1" />
      </Button>
      <Button disabled={loading} onClick={handleProjectStar} variant={"ghost"} size={"icon"}>
        <Star
          fill={optimiticStar || isProjectStarred ? color : "transparent"}
          color={color}
        />
      </Button>
    </div>
  );
}

export default ProjectOptions;
