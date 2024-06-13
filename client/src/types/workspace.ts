import { InvitedMembersType, MembersType } from ".";

type ProjectType = {
  _id: string;
  name: string;
  color: string;
  icon: string;
};

export type WorkspaceType = {
  _id: string;
  name: string;
  admin: string;
  personal: boolean;
  members: [MembersType];
  projects: [ProjectType];
  invitedMembers: [InvitedMembersType];
  tags: string[];
  createdAt: string;
};
