"use client";

import revalidateTagServer from "@/app/actions/actions";
import { likeOrUnlikeTask } from "@/app/actions/task";
import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ThumbsUp, ThumbsUpIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

type Props = {
  isLiked: boolean;
  likesCount?: number;
  taskId: string;
};

const LikeHandler = ({ isLiked, likesCount = 0, taskId }: Props) => {
  const [toggle, setToggle] = useState(isLiked);
  const [totalLikes, setTotalLikes] = useState(likesCount);
  const onClickHandler = async () => {
    const like = await likeOrUnlikeTask(taskId, toggle ? "UNLIKE" : "LIKE");
    if (like.success) {
      revalidateTagServer("task")
      setToggle(!toggle);
      setTotalLikes(toggle ? totalLikes - 1 : totalLikes + 1);
    }
  };

  useEffect(() => {
    setToggle(isLiked);
  }, [isLiked]);

  return (
    <div onClick={onClickHandler}  className={cn("flex items-center gap-x-2 cursor-pointer", buttonVariants({variant: "ghost"}))}>
      <ThumbsUp
        className={cn(
          "h-5 w-5 fill-none cursor-pointer",
          toggle && "text-[#3f6ac4]",
          
        )}
        // fill={toggle ? "bg-primary" : "transparent"}
        // color={"bg-transparent"}
        />
        {totalLikes > 0 && <Label className="text-[#3f6ac4] text-lg">{totalLikes}</Label>}
    </div>
  );
};

export default LikeHandler;
