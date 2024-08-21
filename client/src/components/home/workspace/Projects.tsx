import { SquareFilledIcon } from "@/components/Sidebar/menu/ProjectMenu";
import { cn } from "@/lib/utils";
import { ProjectType } from "@/stores/workspace-store";
import { PlusSquareIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  projects?: ProjectType[];
  workspaceId: string;
  className?: string;

};

type ProjectCardProps = {
  color: string;
  name: string;
  id: string;
  workspaceId: string;
};
const ProjectCard = ({ color, name, id, workspaceId }: ProjectCardProps) => (
  <div className="hover:bg-secondary py-3 px-4 flex items-center gap-x-4 cursor-pointer">
    <SquareFilledIcon className="md:w-10 md:h-10 w-6 h-6" color={color} />
    <Link href={`/home/${id}`} className="font-semibold">
      {name}
    </Link>
  </div>
);
const Projects = ({ projects, workspaceId,className }: Props) => {
  return (
    <div className={cn(className)}>
      <Link
        href={`/projects/new`}
        className="hover:bg-secondary md:py-3 py-2 md:px-4 px-4 flex items-center gap-x-4 cursor-pointer"
      >
        <PlusSquareIcon
          strokeWidth={"1px"}
          className="md:w-10 md:h-10 h-6 w-6 text-muted-foreground !font-normal"
        />
        <p className="font-semibold">New project</p>
      </Link>

        {projects?.map((item, index) => (
          <ProjectCard
            workspaceId={workspaceId}
            id={item._id}
            key={item._id}
            color={item.color}
            name={item.name}
          />
        ))}
      </div>
  );
};

export default Projects;
