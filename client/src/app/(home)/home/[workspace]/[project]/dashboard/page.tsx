import ProjectDashboard from '@/components/home/project/Dashboard';
import React from 'react'

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