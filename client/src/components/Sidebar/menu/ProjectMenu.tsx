import React from "react";
import MenuLink from "./MenuLink";
import { ChevronDown, FolderKanban, PlusIcon, SquareMinus } from "lucide-react";
import { getWorkspace } from "@/app/actions/workspace";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

type Props = { children?: React.ReactNode };

type SquareFilledIconProps = {
  color: string;
  className?: string;
  children?: React.ReactNode;
};

export const SquareFilledIcon = ({
  color,
  className,
  children,
}: SquareFilledIconProps) => {
  return (
    <div
      className={cn("w-4 h-4 rounded-[4px] opacity-70", className)}
      style={{
        backgroundColor: color,
      }}
    >
      {children}
    </div>
  );
};

const ProjectMenu = async () => {
  const { success, workspace } = await getWorkspace();
  if (!success) {
    // return notFound();
  }
  console.log("workspace in the hello", workspace);
  return (
    <div>
      <div className="flex items-center justify-between">
        <div
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "flex gap-x-2 items-center justify-start px-2 py-1.5 text-sm font-semibold cursor-pointer"
          )}
        >
          <FolderKanban className="w-4 h-4" />
          <p>{"Projects"}</p>
        </div>
        <div>
          <Link
            href={`/projects/new`}
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "icon",
              }),
              "h-6 w-6"
            )}
          >
            <PlusIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="mt-1">
        {workspace?.projects.map((item, index) => (
          <MenuLink
            key={index}
            item={{
              name: item.name,
              icon: () => <SquareFilledIcon color={item.color} />,
              path: `/home/${workspace._id}/${item._id}`,
            }}
            className="pl-4"
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectMenu;
