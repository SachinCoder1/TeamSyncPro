import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type MembersType = {
  _id: string;
  name: string;
  email: string;
};

type InvitedMembersType = {
  emails: string[];
  users: string[];
};

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

type State = {
  workspace: WorkspaceType;
};

type Actions = {
  setWorkspaceData: (data: WorkspaceType) => void;
};

const initialState: State = {
  workspace: {} as any,
};

export const useWorkspaceStore = create<State & Actions>()(
  immer((set) => ({
    workspace: initialState as any,
    setWorkspaceData: (data: WorkspaceType) =>
      set((state) => {
        state.workspace = { ...state.workspace, ...data };
      }),
  }))
);
