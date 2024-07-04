"use client";

import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { BuildingIcon, CheckIcon } from "lucide-react";
import revalidateTagServer from "@/app/actions/actions";
import { useSession } from "next-auth/react";
import { updateSelectedWorkspace } from "@/app/actions/user";
import { useRouter } from "next/navigation";

type Props = {
  item: {
    _id: string;
    name: string;
  };
  selectedWorkspace: string;
};

const MyWorkspacesCard = ({ item, selectedWorkspace }: Props) => {
  const router = useRouter();
  const { update } = useSession();

  const handleClick = async (id: string) => {
    if (id === selectedWorkspace) return;
    await update({
      info: id,
    });
    await updateSelectedWorkspace(id);
    revalidateTagServer("workspace");
    router.push("/workspace");

  };
  return (
    <Button
      variant={"ghost"}
      onClick={() => handleClick(item._id)}
      className={cn(
        "w-full justify-between items-center gap-x-2 px-2 text-sm font-normal",
        selectedWorkspace === item._id && "bg-secondary"
      )}
    >
      <div className="flex gap-x-2">
        <BuildingIcon size={20} />
        {item.name}{" "}
      </div>
      {selectedWorkspace === item._id && (
        <CheckIcon size={20} className="text-muted-foreground" />
      )}
    </Button>
  );
};

export default MyWorkspacesCard;
