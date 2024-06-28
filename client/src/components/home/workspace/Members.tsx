import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getColorForName } from "@/lib/utils";
import { MembersType } from "@/types";
import { PlusCircleIcon } from "lucide-react";
import React from "react";

type Props = {
  members?: MembersType[];
};

type UserCardProps = {
  name: string;
  src?: string;
};
const UserCard = ({ name, src }: UserCardProps) => (
  <div className="flex items-center space-x-4 cursor-pointer hover:bg-secondary rounded-md px-2 py-2">
    <Avatar>
      <AvatarImage src="/avatars/01.png" />
      <AvatarFallback
        style={{
          backgroundColor: getColorForName(name),
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

const Members = ({ members }: Props) => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-x-4 gap-y-3 ">
        <div className="flex items-center gap-x-2 ml-1 cursor-pointer hover:bg-secondary rounded-md px-2 py-2">
          <PlusCircleIcon className="h-7 w-7 text-muted-foreground" />
          <span className="text-muted-foreground font-semibold">Add Member</span>
        </div>
        {members?.map((item, index) => (
          <UserCard name={item.name} />
        ))}
      </div>
    </div>
  );
};

export default Members;
