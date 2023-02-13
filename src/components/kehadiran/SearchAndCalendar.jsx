import React from 'react'
import Search from '../Search'
import PilihTanggal from './PilihTanggal'
import calenderIcon from '../../assets/icons/arrow-right.svg'
import { useTanggalKehadiran } from '../../contexts/app/ContextTanggalKehadiran'
import searchIcon from '../../assets/icons/search-icon.svg'
import { useApiKehadiranSearch } from '../../contexts/api/kehadiran/ContextApiKehadiranSearch'
import { useKehadiranListAbsensi } from '../../contexts/api/kehadiran/ContextApiKehadiranListData'

function SearchAndCalendar() {
  const context = useTanggalKehadiran()
  const contextSearch = useApiKehadiranSearch()
  const contextListAbsen = useKehadiranListAbsensi()

  function handleSearch(){
    contextSearch.getSearch()
    contextListAbsen.setListAbsensiMasuk(contextSearch.listSearch.filter((item) => item?.keterangan === 'masuk'))
    contextListAbsen.setListAbsensiKeluar(contextSearch.listSearch.filter((item) => item?.keterangan === 'pulang'))
    
  }

  return (
    <div className='search-calendar'>
        <Search/>
        <div className='wrapper-pilih-tanggal'>
          <PilihTanggal text={context.startText} funcText={context.setStartText} funcTime={context.setStartTime} funcTanggal={context.setStartTanggal} value={context.startTanggal}/>
          <img src={calenderIcon} alt="" />
          <PilihTanggal text={context.endText} funcText={context.setEndText} funcTime={context.setEndTime} funcTanggal={context.setEndTanggal} value={context.endTanggal}/>
        </div>
        <button className='btn-search' onClick={handleSearch}><img src={searchIcon} alt="" /></button>
    </div>
  )
}

export default SearchAndCalendar