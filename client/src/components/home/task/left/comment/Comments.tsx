import { getComments } from '@/app/actions/task';
import React from 'react'
import AddCommentHandler from './AddCommentHandler';

type Props = {
  taskId: string;
}

const Comments = async ({taskId}: Props) => {
  if(!taskId) return <>wait</>
  const comments = await getComments(taskId);
  // if(!comments.success){
  //   return <>No comments</>
  // }
    
  return (
    <div className='w-full'>
      <AddCommentHandler taskId={taskId} comments={comments.data as any} />
    </div>
  )
}

export default Comments