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
