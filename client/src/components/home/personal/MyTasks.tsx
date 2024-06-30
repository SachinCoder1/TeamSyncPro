import { MyTasksType } from '@/types'
import React from 'react'
import TasksList from './TaskList';

type Props = {
    tasks?: MyTasksType[];
    workspaceId: string;
}

const MyTasks = ({tasks,workspaceId}: Props) => {
  return (
    <div>
             {JSON.stringify(tasks, null, 2)}
             
             <TasksList workspaceId={workspaceId} tasks={tasks} />
    </div>
  )
}

export default MyTasks