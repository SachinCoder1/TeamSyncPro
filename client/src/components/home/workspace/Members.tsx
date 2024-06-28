"use client";

import { Icons } from "@/components/Icon/Icons";
import { ResponsiveModal } from "@/components/ui/ResponsiveModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getColorForName } from "@/lib/utils";
import { MembersType } from "@/types";
import { PlusCircleIcon } from "lucide-react";
import React, { useCallback, useState } from "react";
import { ReactTags } from "react-tag-autocomplete";
import AddMemberModal from "./AddMemberModal";

type Props = {
  members?: MembersType[];
  workspaceName?: string;
  workspaceId: string;
};

type UserCardProps = {
  name: string;
  src?: string;
  id: string;
};
const UserCard = ({ name, src, id }: UserCardProps) => (
  <div className="flex items-center space-x-4 cursor-pointer hover:bg-secondary rounded-md px-2 py-2">
    <Avatar>
      <AvatarImage src="/avatars/01.png" />
      <AvatarFallback
        style={{
          backgroundColor: getColorForName(id),
        }}
      >
        {" "}
        {name[0].toUpperCase()}
      </AvatarFallback>
    </Avatar>
    <div>
      <p className="text-sm font-medium leading-none">{name}</p>
      {/* <p className="text-xs text-muted-foreground">{label}</p> */}
    </div>
  </div>
);

const Members = ({ workspaceId, members, workspaceName }: Props) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<{ label: string; value: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const handleMembersAdd = () => {
    console.log("added emails: ", selected);
    handleReset();
  };

  const handleReset = () => {
    setOpen(false);
    setLoading(false);
    setSelected([]);
  };

  const onAdd = useCallback(
    async (newTag: any) => {
      setSelected([...selected, newTag]);
    },
    [selected]
  );

  const onDelete = useCallback(
    async (tagIndex: any) => {
      const tagToRemove = selected[tagIndex];
      setSelected(selected.filter((_: any, i: any) => i !== tagIndex));
      console.log("tag to remove: ", tagToRemove);

      console.log("removing:", tagIndex);
    },
    [selected]
  );
  function isValidEmail(value: any) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  const onValidate = useCallback((value: any) => isValidEmail(value), []);

  return (
    <div>
      <div className="grid grid-cols-3 gap-x-4 gap-y-3 items-center ">
        <AddMemberModal
          workspaceId={workspaceId}
          workspaceName={workspaceName}
          buttonTrigger={
            <>
              <PlusCircleIcon className="h-7 w-7 text-muted-foreground" />
              <span className="text-muted-foreground font-semibold">
                Add Member
              </span>
            </>
          }
        />
        {members?.map((item) => (
          <UserCard key={item._id} name={item.name} id={item._id} />
        ))}
      </div>
    </div>
  );
};

export default Members;
