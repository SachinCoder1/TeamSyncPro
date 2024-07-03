import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { getServerAuth } from "@/lib/auth";
import { cn, isValidObjectId } from "@/lib/utils";
import { notFound, redirect } from "next/navigation";
import { getProject, updateProject } from "@/app/actions/project";
import { Suspense } from "react";
import { SquareFilledIcon } from "@/components/Sidebar/menu/ProjectMenu";
import { LayoutDashboardIcon, List, ListTodo, Sparkles, SquareKanban } from "lucide-react";
import DynamicInputHandler from "@/components/DynamicInputHandler";
import { ShareProject } from "@/components/home/project/ShareProject";
import { Button } from "@/components/ui/button";
import ProjectOptions from "@/components/home/project/ProjectOptions";
import { headingClasses } from "@/components/ui/typography";
import { ProjectNav } from "@/components/home/project/ProjectNav";
import { isStarred } from "@/app/actions/user";
// import { SidebarNav } from "@/app/(app)/examples/forms/components/sidebar-nav"

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};



interface SettingsLayoutProps {
  children: React.ReactNode;
  params: {
    workspace: string;
    project: string;
  };
  searchParams?: {
    invitation_token?: string;
  }
}

export default async function SettingsLayout({
  children,
  params,
  searchParams
}: SettingsLayoutProps) {
  const session = await getServerAuth();
    const url = `/home/${params.project}`
    const sidebarNavItems = [
        {
          title: "Overview",
          href: `${url}/dashboard`,
          icon: <LayoutDashboardIcon className="w-4 h-4 mr-2" />,
        },
        {
          title: "List",
          href: `${url}/list`,
        //   icon: ListTodo
        icon: <ListTodo className="w-4 h-4 mr-2" />,

        },
        {
          title: "Board",
          href: `${url}/board`,
          icon: <SquareKanban className="w-4 h-4 mr-2" />,

        //   icon: SquareKanban
        },
      //   {
      //     title: "Notifications",
      //     href: "/examples/forms/notifications",
      //   },
      //   {
      //     title: "Display",
      //     href: "/examples/forms/display",
      //   },
      ];

  if (!isValidObjectId(params.project)) {
    return redirect(`/workspace`);
  }

  const { success, project } = await getProject(params.project);
  console.log("arrived here...", searchParams)
  if (success === false && !searchParams?.invitation_token) {
    // return notFound();
  }
  console.log("project: ", project);

  const isProjectStarred = await isStarred(params?.project, "project")

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {/* <div className="md:hidden">
          <Image
            src="/examples/forms-light.png"
            width={1280}
            height={791}
            alt="Forms"
            className="block dark:hidden"
          />
          <Image
            src="/examples/forms-dark.png"
            width={1280}
            height={791}
            alt="Forms"
            className="hidden dark:block"
          />
        </div> */}
        <div className="p-2 pb-4">
          <div className="flex flex-col">
           
            <div className="flex justify-between items-center w-full gap-x-2">
              <div className="flex items-center gap-x-4 flex-1">
                <SquareFilledIcon
                  className="p-2 w-8 h-8"
                  color={project?.color || ""}
                >
                  <List className="w-4 h-4" color="white" />
                </SquareFilledIcon>

                <DynamicInputHandler
                  updateFunction={updateProject}
                  tag="project"
                  id="project"
                  fieldName="name"
                  className={cn(headingClasses["h3"])}
                  defaultValue={project?.name || ""}
                />

                <ProjectOptions
                  projectId={project?._id}
                  color={project?.color}
                  isStarred={isProjectStarred.data}
                />
              </div>
              <div className="flex gap-x-2">
                <ShareProject
                  members={project?.members}
                  projectName={project?.name}
                  projectId={project?._id}
                />
                <Button variant={"outline"} size={"sm"}>
                  <Sparkles className="w-4 h-4 mr-2" /> Ask AI
                </Button>
              </div>
            </div>
            <aside className="">
              <ProjectNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1">{children}</div>
         
          </div>
        </div>
      </Suspense>
    </>
  );
}
