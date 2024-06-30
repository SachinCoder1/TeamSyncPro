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
