import { primarySideNav } from "@/data/sidenav";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { getServerAuth } from "@/lib/auth";
import MenuLink from "./menu/MenuLink";
import ProjectMenu, { SquareFilledIcon } from "./menu/ProjectMenu";
import { getMyWorkspaces, getStarredItems } from "@/app/actions/user";
import { Star, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { getWorkspace } from "@/app/actions/workspace";
import Workspaces from "./Workspaces";

export default async function Sidebar() {
  const session = await getServerAuth();
  const workspaceData = getWorkspace();
  const starredItemsData = getStarredItems();
  const workspacesData = getMyWorkspaces();

  const [workspace, starredItems, workspaces] = await Promise.all([
    workspaceData,
    starredItemsData,
    workspacesData,
  ]);
  
  return (
    <aside className="min-h-full w-full px-2 py-2">
      <div className="space-y-1">
        <Workspaces
          workspaces={workspaces.data}
          id={workspace.workspace?._id as string}
          name={workspace.workspace?.name as string}
          selected={session.user.workspace}
        />
        {/* {workspace?.workspace?.name || session.user.id} */}
        {primarySideNav.map((item, index) => (
          <MenuLink key={index} item={item} />
        ))}
      </div>
      <Separator className="my-4" />
      {starredItems?.data &&
        (starredItems.data.starredProjects?.length > 0 ||
          starredItems.data?.starredWorkspaces?.length > 0) && (
          <div className="mb-8">
            <div
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "flex gap-x-2 items-center justify-start px-2 py-1.5 text-sm font-semibold cursor-pointer"
              )}
            >
              <Star className="w-4 h-4" />
              <p>{"Starred"}</p>
            </div>
            <div className="mt-1">
              {starredItems?.data?.starredProjects.map((item, index) => (
                <MenuLink
                  key={index}
                  item={{
                    name: item.project?.name,
                    icon: () => (
                      <SquareFilledIcon color={item.project?.color} />
                    ),
                    path: `/home/${item.project._id}`,
                  }}
                  className="pl-4"
                />
              ))}
            </div>
            <div className="mt-1">
              {starredItems?.data?.starredWorkspaces.map((item, index) => (
                <MenuLink
                  key={index}
                  item={{
                    name: item.workspace?.name,
                    icon: () => <Users className="w-5 h-5" />,
                    path: `/workspace`,
                  }}
                  className="pl-4"
                />
              ))}
            </div>
          </div>
        )}

      <div className="space-y-1">
        <ProjectMenu />
      </div>
    </aside>
  );
}
