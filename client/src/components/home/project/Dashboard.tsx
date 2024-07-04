// TODO: add the time and you joined in the right sidebar 
// TODO: Star the project

import { Heading } from "@/components/ui/typography";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import DescriptionHandler from "./DescriptionHandler";
import { getProject, updateProject } from "@/app/actions/project";
import { notFound } from "next/navigation";
import UserLableAvatarCard from "@/components/ui/UserLableAvatarCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { TeamMembers } from "../TeamMember";
import { getServerAuth } from "@/lib/auth";

type Props = {
  projectId: string;
};

const ProjectDashboard = async ({ projectId }: Props) => {
   const session = await getServerAuth();
   console.log("session.user...........", session?.user)
  const { success, project } = await getProject(projectId);
  if (success === false) {
    // return notFound();
  }

  return (
    <div className="mt-6 space-y-6">
      <div className="space-y-4">
        <Heading className="px-2" variant="h4">
          Project Description
        </Heading>
        {/* <Textarea
          placeholder="What is this project about? "
        /> */}
        <DescriptionHandler description={project?.description} field="description" id="project" revalidateTag="project" updateFunction={updateProject} />
      </div>
      {/* <div>
        <Heading>Project roles</Heading>
        <div className="mt-4 flex gap-x-4 items-center flex-wrap">
          {
            project?.members?.map((item,index) => (
              <UserLableAvatarCard key={item._id+index} id={item._id} name={item.name} label={ project.admin === session?.user.id ? "Project owner" : "Member"} role={project.admin === session?.user.id ? "ADMIN" : "MEMBER"} />
            ))
          }
        </div>

      </div> */}
      <div>
        <Heading>Project roles</Heading>
        <div className="mt-4 flex gap-x-4 items-center flex-wrap">
          {
            project?.members?.map((item,index) => (
              <TeamMembers key={item._id+index} id={item._id} name={item.name} label={ project.admin === session?.user.id ? "Project owner" : "Member"} role={project.admin === session?.user.id ? "ADMIN" : "MEMBER"} />
            ))
          }
        </div>

      </div>
    </div>
  );
};

export default ProjectDashboard;
