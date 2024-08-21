import React from 'react'
import MobileSidebar from './MobileSidebar'
import Sidebar from '.'

type Props = {}

const MainMobileSidebar = (props: Props) => {
  return (
    <div>
        <MobileSidebar>
            <Sidebar />
        </MobileSidebar>
    </div>
  )
}

export default MainMobileSidebar