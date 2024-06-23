"use client";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ThumbsUpIcon } from "lucide-react";
import React, { useState } from "react";

type Props = {
  isLiked: boolean;
  likesCount?: number;
};

const LikeHandler = ({ isLiked, likesCount = 0 }: Props) => {
  const [toggle, setToggle] = useState(isLiked || false);
  const [totalLikes, setTotalLikes] = useState(likesCount);
  const onClickHandler = () => {
    setToggle(!toggle);
    if (isLiked) {
      setTotalLikes(totalLikes - 1);
    } else {
      setTotalLikes(totalLikes + 1);
    }
    console.log(toggle ? "liked" : "unliked");
  };
  return (
    <div className="flex items-center gap-x-2">
      {totalLikes > 0 && <Label>{totalLikes}</Label>}
      <ThumbsUpIcon
        onClick={onClickHandler}
        className={cn(
          "h-5 w-5 fill-none cursor-pointer",
          toggle && "fill-primary text-primary"
        )}
        // fill={toggle ? "bg-primary" : "transparent"}
        // color={"bg-transparent"}
      />
    </div>
  );
};

export default LikeHandler;
