import React from 'react'
import { Heading } from '../ui/typography';

type Props = {
    children: React.ReactNode;
    heading?: string;
    className?: string;

}

const HeadingCard = ({heading,className,children}: Props) => {
  return (
    <div className='border rounded-md py-4 px-4'>
        <Heading variant='h4'>
            {heading}
        </Heading>

        <div className='mt-4'>
            {children}
        </div>
    </div>
  )
}

export default HeadingCard