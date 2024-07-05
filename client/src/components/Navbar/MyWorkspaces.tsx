import { getMyWorkspaces } from "@/app/actions/user";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
import { getServerAuth } from "@/lib/auth";
import { CheckIcon } from "lucide-react";
import MyWorkspacesCard from "./MyWorkspacesCard";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import Loading from "@/app/(home)/home/[project]/loading";

type Props = {};

const MyWorkspaces = async (props: Props) => {
  const workspaces = await getMyWorkspaces();
  const selectedWorkspace = await getServerAuth();
  return (
    <div className="space-y-2">
      {!workspaces && <div><Loading /></div>}
      {/* {JSON.stringify(workspaces, null,2)} */}
      {workspaces?.data?.map((item, index) => (
        <DropdownMenuItem key={item._id} className="hover:!bg-transparent focus:!bg-none px-0 py-0 !p-0 w-full m-0">
          <MyWorkspacesCard
            key={item._id}
            selectedWorkspace={selectedWorkspace.user.workspace}
            item={item}
          />
        </DropdownMenuItem>
      ))}
    </div>
  );
};

export default MyWorkspaces;
