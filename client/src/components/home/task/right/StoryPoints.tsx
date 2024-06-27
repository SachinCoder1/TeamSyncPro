"use client";

import revalidateTagServer from "@/app/actions/actions";
import { updateTask } from "@/app/actions/task";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckIcon, X } from "lucide-react";
import React, { useState } from "react";

type Props = {
  taskId: string;
  point?: number;
};

const StoryPoints = ({ taskId, point }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [pointsValue, setPointsValue] = useState();

  const handleStoryPointClick = async () => {
    setIsEditing(false);
    if (Number(pointsValue) === point) return;
    const update = await updateTask(taskId, {
      storyPoints: Number(pointsValue),
    });
    if (update.success) {
      revalidateTagServer("task");
    }
  };
  return (
    <div>
      {!isEditing && (
        <Badge
          variant={point ? "default" : "secondary"}
          onClick={() => setIsEditing(true)}
        >
          {point || "None"}
        </Badge>
      )}

      {isEditing && (
        <>
          <Input
            type="number"
            placeholder="e.g. 10"
            autoFocus
            defaultValue={point || ""}
            onBlur={handleStoryPointClick}
            onChange={(e) => setPointsValue(e.target.value as any)}
          />
          {/* <div className="flex justify-end w-full">
            <Button size={"icon"}>
              <CheckIcon />
            </Button>
            <Button variant={"ghost"} size={"icon"}>
              <X className="w-5 h-5" />
            </Button>
          </div> */}
        </>
      )}
    </div>
  );
};

export default StoryPoints;
