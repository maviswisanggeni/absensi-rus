import React from 'react'
import Download from './Download'
import Filter from './Filter'
import Tabbar from './Tabbar'

function TabbarAndFilter() {
  return (
    <div className='tabbar-filter'>
        <Tabbar/>
        <div className='filter-download'>
            <Filter/>
            <Download/>
        </div>
    </div>
  )
}

export default TabbarAndFilter