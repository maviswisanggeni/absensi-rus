import React from 'react'
import Download from './Download'
import Tabbar from '../Tabbar'
import Filter from '../Filter'
import { useKehadiranListAbsensi } from '../../contexts/api/kehadiran/ContextApiKehadiranListData'

function TabbarAndFilter() {
  const context = useKehadiranListAbsensi()
  return (
    <div className='tabbar-filter'>
        <Tabbar option1="Masuk" option2="Keluar" funcPage={context.setCurrentPage} funcKeterangan={context.setKeterangan}/>
        <div className='filter-download'>
            <Filter option1="Tercepat" option2="Terlambat" 
              setState={context.setUrutan} 
              list1={context.listAbsensiMasuk}
              list2={context.listAbsensiKeluar}
              setlist1={context.setListAbsensiMasuk}
              setlist2={context.setListAbsensiKeluar}
            />
            <Download/>
        </div>
    </div>
  )
}

export default TabbarAndFilter