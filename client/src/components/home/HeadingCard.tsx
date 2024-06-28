import React from 'react'
import { Heading } from '../ui/typography';

type Props = {
    children: React.ReactNode;
    heading?: string;
    className?: string;

}

const HeadingCard = ({heading,className,children}: Props) => {
  return (
    <div className='border rounded-md py-3 px-2'>
        <Heading variant='h4'>
            {heading}
        </Heading>

        <div>
            {children}
        </div>
    </div>
  )
}

export default HeadingCard