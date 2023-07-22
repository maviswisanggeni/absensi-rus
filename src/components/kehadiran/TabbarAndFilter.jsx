import React, { useState } from 'react'
import Download from './Download'
import Tabbar from '../Tabbar'
import Filter from '../Filter'
import { useKehadiranListAbsensi } from '../../contexts/api/kehadiran/ContextApiKehadiranListData'
import { updateStateKehadiran } from '../../features/kehadiranSlice'
import { useSearchParams } from 'react-router-dom'
import { setCurrentKategori, setKategoriId } from '../../features/ketegoriSlice'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

function TabbarAndFilter() {
  const { listTabbar } = useSelector(state => state.kehadiran)
  let [searchParams] = useSearchParams();
  const [slicedParams, setSlicedParams] = useState([])

  useEffect(() => {
    const paramsObject = Object.fromEntries(new URLSearchParams(searchParams));
    paramsObject.paginate = 1;
    const updatedSearchParams = new URLSearchParams(paramsObject).toString();
    setSlicedParams(updatedSearchParams);
  }, [searchParams])

  return (
    <div className='tabbar-filter'>
      <Tabbar
        options={listTabbar}
        setKategoriId={setKategoriId}
        setCurrentKategori={setCurrentKategori}
        setKeterangan={updateStateKehadiran}
        searchParams={slicedParams.toString()}
        path='/kehadiran'
        loading={false}
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