import { Button } from '@/components/ui/button'
import { PaperclipIcon } from 'lucide-react'
import React from 'react'

type Props = {}

const AttachFiles = (props: Props) => {
  return (
    <Button variant={"ghost"} size={"icon"}>
        <PaperclipIcon className='h-5 w-5 cursor-pointer' />
    </Button>
  )
}

export default AttachFiles