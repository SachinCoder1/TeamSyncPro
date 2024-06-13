import { Heading } from "@/components/ui/typography";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import DescriptionHandler from "./DescriptionHandler";

type Props = {};

const ProjectDashboard = (props: Props) => {
  return (
    <div className="px-10 mt-6">
      <div className="space-y-6">
        <Heading variant="h4">Project Description</Heading>
        {/* <Textarea
          placeholder="What is this project about? "
        /> */}
        <DescriptionHandler />
      </div>
    </div>
  );
};

export default ProjectDashboard;
