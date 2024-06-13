import { primarySideNav } from "@/data/sidenav";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { getServerAuth } from "@/lib/auth";
import MenuLink from "./menu/MenuLink";
import ProjectMenu from "./menu/ProjectMenu";

export default async function Sidebar() {
  const session = await getServerAuth();
  return (
    <aside className="min-h-full w-full px-2 py-2">
      <div className="space-y-1">
        {session?.user?.workspace}
        {primarySideNav.map((item, index) => (
          <MenuLink key={index} item={item} />
        ))}
      </div>
      <Separator className="my-4" />
      <div className="space-y-1">
        <ProjectMenu />
      </div>
    </aside>
  );
}
