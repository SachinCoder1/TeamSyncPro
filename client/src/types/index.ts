export type User = {
  id: string;
  name: string;
  email: string;
};

type stepType =
  | "SIGNED_UP"
  | "PROFILE_SETUP"
  | "WORKSPACE_CREATED"
  | "PROJECT_CREATED"
  | "SECTION_CREATED"
  | "TASK_CREATED"
  | "INVITED_PEOPLE_OPTIONAL"
  | "COMPLETED";

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  emailVerified: "VERIFIED" | "NOT_VERIFIED";
  onboarding: {
    done: boolean;
    step: stepType;
  };
  workspace: string;
};

export type MembersType = {
  _id: string;
  name: string;
  email: string;
};

export type InvitedMembersType = {
  emails: string[];
  users: string[];
};

export type InvitationType = {
  invited_from: {
    name: string;
    _id: string;
    profileImage?: string;
  };
  invited_to: string;
  status: "INVITED" | "ACCEPTED" | "REJECTED" | "EXPIRED";
  type: "WORKSPACE" | "PROJECT";
  createdAt: Date;
  updatedAt: Date;
};

export type MyTasksType = {
  _id: string;
  title: string;
  project: {
    _id: string;
    name: string;
    color: string;
  };
  done: boolean;
  priority: "LOW" | "MEDIUM";
  status: {
    title: string;
    sectionId: string;
  };
  workflow: "DEFAULT";
  due?: Date;
  order: number;
};
export type ShortMemberType = {
  _id: string;
  name: string;
  email: string;
  profileImage?: string;
  createdAt: Date;
};

export type StarredProjectType = {
  _id: string;
  user: string;
  workspace: string;
  project: {
    _id: string;
    name: string;
    color: string;
  };
  __v: number;
};

export type StarredWorkspaceType = {
  _id: string;
  user: string;
  workspace: {
    _id: string;
    name: string;
  };
  __v: number;
};

export type StarredDataType = {
  starredProjects: StarredProjectType[];
  starredWorkspaces: StarredWorkspaceType[];
};
