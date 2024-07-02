import { ProjectType } from "@/types/project";
import React from "react";
import { ListContainer } from "./ListContainer";

type Props = {
  project?: ProjectType;
};

const initialData: any = [
  {
    order: 1,
    id: "section1",
    title: "section 1",
    cards: [
      {
        id: "task1",
        title: "task1",
        order: 1,
      },
      {
        id: "task2",
        title: "task2",
        order: 2,
      },
    ],
  },
  {
    order: 2,
    id: "section2",
    title: "section 2",
    cards: [
      {
        id: "task3",
        title: "task3",
        order: 1,
      },
      {
        id: "task4",
        title: "task4",
        order: 2,
      },
    ],
  },
];

const Board = ({ project }: Props) => {
    console.log("project.sections:", project?.sections)
  return (
    <div>
      board
      {/* {JSON.stringify(project, null,2)} */}
      <ListContainer boardId="5432145432" initialData={project?.sections || initialData} />
    </div>
  );
};

export default Board;
