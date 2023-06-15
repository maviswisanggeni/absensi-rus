import React from 'react'
import Download from './Download'
import Tabbar from '../Tabbar'
import Filter from '../Filter'
import { useKehadiranListAbsensi } from '../../contexts/api/kehadiran/ContextApiKehadiranListData'
import { updateStateKehadiran } from '../../features/kehadiranSlice'
import { useSearchParams } from 'react-router-dom'
import { setCurrentKategori, setKategoriId } from '../../features/ketegoriSlice'

function TabbarAndFilter() {
  const context = useKehadiranListAbsensi()
  let [searchParams] = useSearchParams();

  const options = [
    { kategori: 'Masuk', id: 1 },
    { kategori: 'Keluar', id: 2 },
    { kategori: 'Izin', id: 3 },
  ]

  return (
    <div className='tabbar-filter'>
      <Tabbar
        options={options}
        setKategoriId={setKategoriId}
        setCurrentKategori={setCurrentKategori}
        funcPage={context.setCurrentPage}
        funcKeterangan={updateStateKehadiran}
        searchParams={searchParams.toString()}
        path='/kehadiran'
        loading={true}
      />
      <div className='filter-download'>
        <Filter option1="Tercepat" option2="Terlambat"
          setState={updateStateKehadiran}
        />
        <Download />
      </div>
    </div>
  )
}

export default TabbarAndFilter