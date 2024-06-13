import { primarySideNav } from "@/data/sidenav";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { Suspense } from "react";
import { buttonVariants } from "../ui/button";
import { Separator } from "@/components/ui/separator";
import { headers } from "next/headers";
import { BACKEND_URL } from "@/config";
import { getServerAuth } from "@/lib/auth";
import { notFound } from "next/navigation";

type Props = {
  item: {
    name: string;
    icon: any;
  };
};

const MenuLink = ({ item }: Props) => {
  return (
    <Link
      href={item.name}
      //   className={`flex gap-x-2 items-center px-2 py-1.5 text-sm font-semibold rounded-md hover:bg-[#404043]`}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "flex gap-x-2 items-center justify-start px-2 py-1.5 text-sm font-semibold"
      )}
    >
      <item.icon className="w-4 h-4" />
      <p>{item.name}</p>
    </Link>
  );
};

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
    </aside>
  );
}
