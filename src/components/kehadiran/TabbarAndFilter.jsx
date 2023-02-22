import React from 'react'
import Download from './Download'
import Tabbar from '../Tabbar'
import Filter from '../Filter'

function TabbarAndFilter() {
  return (
    <div className='tabbar-filter'>
        <Tabbar option1="Masuk" option2="Keluar"/>
        <div className='filter-download'>
            <Filter option1="Tercepat" option2="Terlambat"/>
            <Download/>
        </div>
    </div>
  )
}

export default TabbarAndFilter