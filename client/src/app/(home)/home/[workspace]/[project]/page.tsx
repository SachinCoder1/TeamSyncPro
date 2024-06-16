import { getProject } from "@/app/actions/project";
import { getWorkspace } from "@/app/actions/workspace";
import DynamicInputHandler from "@/components/DynamicInputHandler";
import { SquareFilledIcon } from "@/components/Sidebar/menu/ProjectMenu";
import ProjectMain from "@/components/home/project";
import ProjectOptions from "@/components/home/project/ProjectOptions";
import ShareProjectAndAi from "@/components/home/project/ProjectOptionsShareAi";
import { ShareProject } from "@/components/home/project/ShareProject";
import StarButton from "@/components/ui/StarButton";
import { Button } from "@/components/ui/button";
import { Heading, headingClasses } from "@/components/ui/typography";
import { getServerAuth } from "@/lib/auth";
import { cn, isValidObjectId } from "@/lib/utils";
import {
  ChevronDown,
  List,
  Sparkles,
  Star,
  UserRound,
  UsersRound,
} from "lucide-react";
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
        <div className="flex justify-between items-center w-full gap-x-4">
          <div className="flex items-center gap-x-4 flex-1">
            <SquareFilledIcon
              className="p-2 w-8 h-8"
              color={project?.color || ""}
            >
              <List className="w-4 h-4" color="white" />
            </SquareFilledIcon>

            <DynamicInputHandler
              fieldName="name"
              className={cn(headingClasses["h3"])}
              defaultValue={project?.name || ""}
            />

            {/* <Heading>{project?.name}</Heading> */}
            <ProjectOptions projectId={project?._id} color={project?.color} />
            {/* <div className="">
              <Button variant={"ghost"} size={"icon"}>
                <ChevronDown color="#6d6e6f" className="my-1" />
              </Button>
              <Button variant={"ghost"} size={"icon"}>
                <Star
                  fill={false ? project?.color : "transparent"}
                  color={project?.color}
                />
              </Button>
            </div> */}
          </div>
          <div className="flex gap-x-2">
            <ShareProject members={project?.members} projectName={project?.name} projectId={project?._id} />
            <Button variant={"outline"} size={"sm"}>
              <Sparkles className="w-4 h-4 mr-2" /> Ask AI
            </Button>
          </div>
          {/* <ShareProjectAndAi /> */}
        </div>
        <ProjectMain projectId={params.project} />
      </Suspense>
    </div>
  );
}
