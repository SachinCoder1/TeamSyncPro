import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectDashboard from "./Dashboard";
import ProjectList from "./List";
import ProjecBoard from "./Board";

type Props = {
  projectId: string;
};

const tabs = [
  {
    name: "Dashboard",
    value: "dashboard",
  },
  {
    name: "List",
    value: "list",
  },
  {
    name: "Board",
    value: "board",
  },
];
const tabsContent = [
  {
    name: "Dashboard",
    value: "dashboard",
    content: ProjectDashboard,
  },
  {
    name: "List",
    value: "list",
    content: ProjectList,
  },
  {
    name: "Board",
    value: "board",
    content: ProjecBoard,
  },
];

const ProjectMain = ({ projectId }: Props) => {
  return (
    <Tabs defaultValue="dashboard" className="">
      <TabsList>
        {tabs?.map((item, index) => (
          <TabsTrigger key={index} value={item.value}>
            {item.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabsContent?.map((item, index) => (
        <TabsContent key={`${index}${item.value}`} value={item.value}>
          {<item.content projectId={projectId} />}
        </TabsContent>
      ))}
      {/* <TabsContent value="password">Change your password here.</TabsContent> */}
    </Tabs>
  );
};

export default ProjectMain;
