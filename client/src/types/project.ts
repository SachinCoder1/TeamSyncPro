import { InvitedMembersType, MembersType } from ".";

type Workflow = "DEFAULT" | "DO_TODAY" | "DO_LATER" | "DO_THIS_WEEK"  | "DO_THIS_MONTH";

type TaskType = {
  _id: string;
  title: string;
  order: number;
  tags: string[];
  likedBy: string[];
  project: string;
  comments: string[];
  taskCreator: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "HIGHEST";
  status: "INCOMPLETE" | "COMPLETE";
  workflow: Workflow;
  createdAt: string;
  updatedAt: string;
};
  
type SectionType = {
  _id: string;
  title: string;
  order: number;
  project: string;
  tasks: [TaskType];
  createdAt: string;
  updatedAt: string;
};

export type ProjectType = {
  _id: string;
  name: string;
  color: string;
  icon: string | "DEFAULT";
  admin: string;
  members: [MembersType];
  invitedMembers: InvitedMembersType;
  sections: [SectionType];
  workspace: string;
  createdAt: string;
  updatedAt: string;
};