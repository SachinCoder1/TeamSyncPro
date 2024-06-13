export type User = {
  id: string;
  name: string;
  email: string;
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
