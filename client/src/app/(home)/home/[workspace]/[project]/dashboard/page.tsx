import ProjectDashboard from '@/components/home/project/Dashboard';
import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
  title: "Dashboard - TeamSyncPro",
  description: "A task and issue tracker build using Tanstack Table.",
}


type Props = {
    params: {
      workspace: string;
      project: string;
    };
  };
const page = ({params}: Props) => {
  return (
    <div>
        <ProjectDashboard projectId={params.project} />
    </div>
  )
}

export default page