"use client";

import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

type Props = {
  src?: string;
  name: string;
  label: string;
  id: string;
  role: string;
};

function UserLableAvatarCard({ id,name,role, src, label }: Props) {
  return (
    <div
      onClick={() => {
        console.log("clicked...", id,name,role);
      }}
      className="flex items-center gap-x-3 cursor-pointer hover:bg-secondary w-fit px-4 rounded-xl py-1.5 group"
    >
      <Avatar className="relative w-8 h-8">
        {src ? (
          <div className="relative aspect-square h-full w-full">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          </div>
        ) : (
          <AvatarFallback className="group-hover:bg-background">
            {/* <span className="text-black dark:text-white"> */}
            {name[0].toUpperCase()}
            {/* </span> */}
            {/* <Icon name="user" /> */}
          </AvatarFallback>
        )}
      </Avatar>
      <div className="flex items-center justify-start gap-2">
        <div className="flex flex-col space-y-0.5 leading-none">
          {name && <p className="font-medium text-sm">{name}</p>}
          {label && (
            <p className="truncate text-xs text-zinc-700 dark:text-gray-400">
              {label}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserLableAvatarCard;
