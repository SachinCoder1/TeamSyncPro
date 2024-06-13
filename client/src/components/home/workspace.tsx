import { WorkspaceType, useWorkspaceStore } from "@/stores/workspace-store";
import React from "react";

type Props = {
  workspaceData: WorkspaceType;
};

export default function Workspace({ workspaceData }: Props) {
  const { workspace, setWorkspaceData } = useWorkspaceStore();
  // setWorkspaceData(workspaceData);
  return <div></div>;
}
