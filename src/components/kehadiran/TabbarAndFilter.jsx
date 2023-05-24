import React from 'react'
import Download from './Download'
import Tabbar from '../Tabbar'
import Filter from '../Filter'
import { useKehadiranListAbsensi } from '../../contexts/api/kehadiran/ContextApiKehadiranListData'
import { filterToggle, tabbarToggle } from '../../features/kehadiranSlice'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function TabbarAndFilter() {
  const context = useKehadiranListAbsensi()
  let [searchParams] = useSearchParams();
  const { kehadiranMasuk, kehadiranKeluar, kehadiranIzin } = useSelector(state => state.kehadiran)

  return (
    <div className='tabbar-filter'>
      <Tabbar
        option1="Masuk"
        option2="Keluar"
        option3='Izin'
        funcPage={context.setCurrentPage}
        funcKeterangan={tabbarToggle}
        searchParams={searchParams.toString()}
        path='/kehadiran'
      />
      <div className='filter-download'>
        <Filter option1="Tercepat" option2="Terlambat"
          setState={filterToggle}
        />
        <Download />
      </div>
    </div>
  )
}

export default TabbarAndFilter