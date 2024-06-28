import { InvitedMembersType, MembersType } from ".";

type Workflow =
  | "DEFAULT"
  | "DO_TODAY"
  | "DO_LATER"
  | "DO_THIS_WEEK"
  | "DO_THIS_MONTH";

export type CommentType = {
  _id: string;
  comment: string;
  user: {
    _id: string;
    name: string;
    profileImage?: string;
  };
  createdAt: Date;
  updatedAt?: Date;
  edited?: boolean;
};


export type DependencyType = {
  by: "IS_BLOCKED_BY" | "BLOCKS";
  task: {
    title: string;
    _id: string;
    status: {
      title: string;
      sectionId: string;
    };
    priority: "LOW" | "MEDIUM" | "HIGH" | "HIGHEST";
  };
};
export type TaskType = {
  _id: string;
  title: string;
  description?: string;
  order: number;
  tags: string[];
  likedBy: string[];
  project: string;
  comments: string[];
  taskCreator: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "HIGHEST";
  status: {
    title: string;
    sectionId: string;
  };
  done: boolean;
  section: string;
  due: Date;
  storyPoints: number;
  workflow: Workflow;
  createdAt: string;
  updatedAt: string;
  dependency?: DependencyType
};

export type TagType = {
  _id: string;
  name: string;
  color: string;
};

export type StatusType = {
  _id: string;
  title: string;
  order: number;
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
  description: string | undefined;
};
