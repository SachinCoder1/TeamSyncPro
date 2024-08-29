"use client";

import { Icons } from "@/components/Icon/Icons";
import { ResponsiveModal } from "@/components/ui/ResponsiveModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn, getColorForName } from "@/lib/utils";
import { MembersType, ShortMemberType } from "@/types";
import {
  CalendarDays,
  CircleUserRoundIcon,
  MailIcon,
  MoveRight,
  MoveUpRightIcon,
  PlusCircleIcon,
} from "lucide-react";
import React, { useCallback, useState } from "react";
import { ReactTags } from "react-tag-autocomplete";
import AddMemberModal from "./AddMemberModal";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { getMemberProfile, getMemberShortProfile } from "@/app/actions/user";
import { format } from "date-fns";
import Link from "next/link";
import Loading from "@/app/(home)/home/[project]/loading";

type Props = {
  members?: MembersType[];
  workspaceName?: string;
  workspaceId: string;
};

type UserCardProps = {
  name: string;
  src?: string;
  id: string;
  avatarClassName?: string;
  className?: string;
  nameFallback?: string;
};

export const UserAvatarCard = ({
  avatarClassName,
  src,
  id,
  name,
}: UserCardProps) => (
  <Avatar className={cn(avatarClassName)}>
    <AvatarImage src={src ? src : ""} />
    <AvatarFallback
      style={{
        backgroundColor: getColorForName(id),
      }}
    >
      {name[0].toUpperCase()}
    </AvatarFallback>
  </Avatar>
);
export const UserCard = ({
  name,
  src,
  id,
  avatarClassName,
  nameFallback,
  className,
}: UserCardProps) => {
  const [loading, setLoading] = useState(false);
  const [memberProfile, setMemberProfile] = useState<ShortMemberType | null>(
    null
  );
  const handleHover = async (isOpen: boolean) => {
    if (memberProfile) return;
    setLoading(true);
    if (isOpen === true && name) {
      const profile = await getMemberShortProfile(id);
      setMemberProfile(profile.data || null);
    }

    if (isOpen === false) {
    }
    setLoading(false);
  };
  return (
    <div>
      <HoverCard onOpenChange={handleHover}>
        <HoverCardTrigger asChild>
          <div
            className={cn(
              "flex items-center  space-x-4 cursor-pointer hover:bg-secondary rounded-md px-2 py-2",
              className
            )}
          >
            {!name ? (
              <CircleUserRoundIcon
                className={cn("text-muted-foreground", avatarClassName)}
              />
            ) : (
              <Avatar className={cn(avatarClassName)}>
                <AvatarImage src={src ? src : ""} />
                <AvatarFallback
                  style={{
                    backgroundColor: getColorForName(id),
                  }}
                >
                  {name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}

            <div>
              {name ? (
                <p className="text-sm font-medium leading-none">{name}</p>
              ) : (
                <p className="text-sm text-muted-foreground font-medium leading-none">
                  {nameFallback || "None"}
                </p>
              )}
            </div>
          </div>
        </HoverCardTrigger>
        {name && (
          <HoverCardContent className="w-max">
            {loading && !memberProfile && (
              <div>
                <Loading />
              </div>
            )}
            {memberProfile && (
              <div className="flex gap-x-2 w-max h-max">
                <UserAvatarCard
                  id={memberProfile._id}
                  name={memberProfile.name}
                />
                <div className="space-y-1 w-max h-max px-2">
                  <div>
                    <h4 className="text-sm font-semibold">
                      @{memberProfile.name}
                    </h4>
                    {/* <Link href={`mailto:${memberProfile.email}`} className={cn(buttonVariants({size: "sm", variant: "link"}),"text-muted-foreground -pt-2")}> */}

                    {/* </Link> */}
                    <div className="flex items-center">
                      <MailIcon className="mr-2 h-3 w-3 opacity-70" />{" "}
                      <span className="text-xs text-muted-foreground">
                        {memberProfile.email}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center py-2">
                    <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                    <span className="text-xs text-muted-foreground">
                      Joined{" "}
                      {format(memberProfile?.createdAt || "", "MMMM yyyy")}
                    </span>
                  </div>
                  {/* <Link
                  target="_blank"
                    className={cn(buttonVariants({ variant: "outline" , size: "sm"}), "w-full items-center gap-x-2")}
                    href={`/profile/${memberProfile._id}`}
                  >
                    View profile <MoveUpRightIcon className="text-muted-foreground" size={20} />
                  </Link> */}
                </div>
              </div>
            )}
          </HoverCardContent>
        )}
      </HoverCard>
    </div>
  );
};

const Members = ({ workspaceId, members, workspaceName }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="grid grid-cols-3 gap-x-4 gap-y-3 items-center ">
        <AddMemberModal
          open={open}
          setOpen={setOpen}
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
