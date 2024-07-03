import { getWorkspace } from "@/app/actions/workspace";
import NewProjectHandler from "@/components/projects/NewProjectHandler";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Label } from "@/components/ui/label";
import { Heading } from "@/components/ui/typography";
import { authOptions } from "@/utils/authOptions";
import { ChevronLeft } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

type Props = {};

const Page = async (props: Props) => {
  const workspace = await getWorkspace();
  if (workspace.success == false) {
  }

  return (
    <div className="mt-8 px-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/home">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link href={`/workspace`}>
              {workspace.workspace?.name}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>New project</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-2 my-4">
        <Heading className="font-normal">New Project</Heading>
        <p className="text-sm text-muted-foreground">
          This will create project in <b>{workspace?.workspace?.name || ""}</b>
        </p>
      </div>

      <div>
        <NewProjectHandler workspaceId={workspace.workspace?._id as string} />
      </div>
    </div>
  );
};

export default Page;
