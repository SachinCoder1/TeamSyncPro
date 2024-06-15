import { Heading } from "@/components/ui/typography";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import DescriptionHandler from "./DescriptionHandler";
import { getProject } from "@/app/actions/project";
import { notFound } from "next/navigation";

type Props = {
  projectId: string;
};

const ProjectDashboard = async ({projectId}: Props) => {
  console.log("projectId in the project dashboard:", projectId);
  const { success, project } = await getProject(projectId);
  if (success === false) {
    return notFound();
  }
  console.log("project final.....................................................: ", project);

  return (
    <div className="px-10 mt-6">
      <div className="space-y-6">
        <Heading className="px-2" variant="h4">Project Description</Heading>
        {/* <Textarea
          placeholder="What is this project about? "
        /> */}
        <DescriptionHandler description={project?.description}  />
      </div>
    </div>
  );
};

export default ProjectDashboard;
