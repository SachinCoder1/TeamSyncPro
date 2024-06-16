'use client'

import { Button } from "@/components/ui/button";
import { Sparkles, UsersRound } from "lucide-react";
import React from "react";
import { ShareProject } from "./ShareProject";

type Props = {};

const ShareProjectAndAi = (props: Props) => {
  return (
    <div>
      <div className="flex gap-x-2">
        {/* <Button variant={"default"} size={"sm"}>
          <UsersRound className="w-4 h-4 mr-2" /> Share
        </Button> */}
        {/* <ShareProject /> */}
        <Button variant={"outline"} size={"sm"}>
          <Sparkles className="w-4 h-4 mr-2" /> Ask AI
        </Button>
      </div>
    </div>
  );
};

export default ShareProjectAndAi;
