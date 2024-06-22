import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import Image from "next/image";
import { z } from "zod";
import { taskSchema } from "./tasks/data/schema";
import { DataTable } from "./tasks/components/data-table";
import { columns } from "./tasks/components/columns";
import data from "./tasks/data/tasks.json";
import { getProject } from "@/app/actions/project";

// import { columns } from "./components/columns"
// import { DataTable } from "./components/data-table"
// import { UserNav } from "./components/user-nav"
// import { taskSchema } from "./data/schema"

// Simulate a database read for tasks.
async function getTasks() {
  // const data = await fs.readFile(
  //   path.join(process.cwd(), "../tasks/data/tasks.json")
  // )

  // const tasks = JSON.parse(data.toString())

  return z.array(taskSchema).parse(data);
}
type Props = {
  projectId: string;
  workspaceId: string;
};

export default async function ProjectList({ projectId,workspaceId }: Props) {
  // const tasks = await getTasks();
  const project = await getProject(projectId);
  const transformedData = project.project?.sections.flatMap((project) =>
    project.tasks.map((task) => ({
      id: task._id || "NA",
      sectionStatus:project.title,
      title: task.title || "NA",
      status: task.status || "NA",
      label: task.workflow || "NA", // Assuming workflow corresponds to label
      priority: task.priority || "NA",
      assignee: {
        name: "Unknown", // Replace with actual assignee if available
        id: "unknown", // Replace with actual assignee ID if available
      },
    }))
  );

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      {JSON.stringify(transformedData, null, 2)}

      <div className="hidden h-full flex-1 flex-col space-y-8 mt-4 md:flex">
        {/* <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div> */}
        <DataTable data={transformedData as any} columns={columns} />
      </div>
    </>
  );
}
