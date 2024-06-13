import { getProject } from "@/app/actions/project";
import { getWorkspace } from "@/app/actions/workspace";
import { SquareFilledIcon } from "@/components/Sidebar/menu/ProjectMenu";
import ProjectMain from "@/components/home/project";
import StarButton from "@/components/ui/StarButton";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/typography";
import { getServerAuth } from "@/lib/auth";
import { isValidObjectId } from "@/lib/utils";
import { ChevronDown, List, Sparkles, Star, UserRound, UsersRound } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import React, { Suspense } from "react";

type Props = {
  params: {
    workspace: string;
    project: string;
  };
};

export default async function page({ params }: Props) {
  const session = await getServerAuth();

  if (!isValidObjectId(params.project)) {
    return redirect(`/home/${session.user.workspace}`);
  }

  const { success, project } = await getProject(params.project);
  if (success === false) {
    return notFound();
  }
  console.log("project: ", project);

  return (
    <div>
      {/* page and the id is: {params.project} */}
      <Suspense fallback={<div>Loading...</div>}>
        {/* {JSON.stringify(project, null, 2)} */}
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-x-4">
            <SquareFilledIcon
              className="p-2 w-8 h-8"
              color={project?.color || ""}
            >
              <List className="w-4 h-4" color="white" />
            </SquareFilledIcon>

            <Heading>{project?.name}</Heading>
            <div className="">
              <Button variant={"ghost"} size={"icon"}>
                <ChevronDown color="#6d6e6f" className="my-1" />
              </Button>
              <Button variant={"ghost"} size={"icon"}>
                <Star
                  fill={false ? project?.color : "transparent"}
                  color={project?.color}
                />
              </Button>
            </div>
          </div>
          <div className="flex gap-x-2">
            <Button variant={"default"} size={"sm"}>
              <UsersRound className="w-4 h-4 mr-2" />  Share
            </Button>
            <Button variant={"outline"} size={"sm"}>
              <Sparkles className="w-4 h-4 mr-2" />  Ask AI
            </Button>
          </div>
        </div>
        <ProjectMain />
      </Suspense>
    </div>
  );
}
