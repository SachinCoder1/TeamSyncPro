// import { getProject } from "@/app/actions/project";
// import { getWorkspace } from "@/app/actions/workspace";
// import DynamicInputHandler from "@/components/DynamicInputHandler";
// import { SquareFilledIcon } from "@/components/Sidebar/menu/ProjectMenu";
// import ProjectMain from "@/components/home/project";
// import ProjectDashboard from "@/components/home/project/Dashboard";
// import ProjectOptions from "@/components/home/project/ProjectOptions";
// import ShareProjectAndAi from "@/components/home/project/ProjectOptionsShareAi";
// import { ShareProject } from "@/components/home/project/ShareProject";
// import StarButton from "@/components/ui/StarButton";
// import { Button } from "@/components/ui/button";
// import { Heading, headingClasses } from "@/components/ui/typography";
// import { getServerAuth } from "@/lib/auth";
// import { cn, isValidObjectId } from "@/lib/utils";
// import {
//   ChevronDown,
//   List,
//   Sparkles,
//   Star,
//   UserRound,
//   UsersRound,
// } from "lucide-react";
import { redirect } from "next/navigation";
// import React, { Suspense } from "react";

type Props = {
  params: {
    workspace: string;
    project: string;
  };
};

export default async function page({ params }: Props) {
  // const session = await getServerAuth();

  // if (!isValidObjectId(params.project)) {
  //   return redirect(`/home/${session.user.workspace}`);
  // }

  // const { success, project } = await getProject(params.project);
  // if (success === false) {
  //   return notFound();
  // }
  // console.log("project: ", project);
  return redirect(`/home/${params.workspace}/${params.project}/list`);

  // return (
  //  <div>
  //   <ProjectDashboard projectId={params.project} />
  //  </div>
  // );
}
