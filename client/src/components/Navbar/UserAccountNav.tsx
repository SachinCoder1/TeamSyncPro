import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Image from "next/image";
import Icon from "../Icon";
import Link from "next/link";
import { Gem } from "lucide-react";
import { Heading } from "../ui/typography";
import MyWorkspaces from "./MyWorkspaces";

interface UserAccountNavProps {
  email: string | undefined;
  name: string;
  imageUrl: string;
}

const UserAccountNav = async ({
  email,
  imageUrl,
  name,
}: UserAccountNavProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Button className="rounded-full h-8 w-8 aspect-square bg-slate-400">
          <Avatar className="relative w-8 h-8">
            {imageUrl ? (
              <div className="relative aspect-square h-full w-full">
                <Image
                  fill
                  src={imageUrl}
                  alt="profile picture"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <AvatarFallback>
                <span className="text-black dark:text-white">
                  {name[0].toUpperCase()}
                </span>
                {/* <Icon name="user" /> */}
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="" align="end">
        <div className="flex gap-x-2">
          <div className="w-40 py-1">
            <Heading variant="h6" className="font-normal mb-2 px-1">
              Workspaces
            </Heading>
            <MyWorkspaces />
          </div>
          <div className="border-l">
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-0.5 leading-none">
                {name && <p className="font-medium text-sm">{name}</p>}
                {email && (
                  <p className="w-[200px] truncate text-xs text-zinc-700 dark:text-gray-400">
                    {email}
                  </p>
                )}
              </div>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href="/dashboard">Dashboard</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/pricing">
                Upgrade <Gem className="text-blue-600 h-4 w-4 ml-1.5" />
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <Link href={"/auth/signout"}>
              <DropdownMenuItem className="cursor-pointer">
                Log out
              </DropdownMenuItem>
            </Link>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
