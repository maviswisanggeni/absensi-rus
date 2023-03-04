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

  function checkSearch(search){
    return search === null ? true : false
  }

  async function handleSearch() {
    contextSearch.getSearch().then((res) => {
      contextSearch.setLoading(true);
      contextSearch.setListSearch(res.data.data.list_absen.masuk.data);
      contextListAbsen.setListAbsensiMasuk(
        checkSearch(res.config.params.search)
        ? res.data.data.list_absen.masuk.data
        : res.data.data.list_absen.masuk
      )
      contextListAbsen.setListAbsensiKeluar(
        checkSearch(res.config.params.search)
          ? res.data.data.list_absen.pulang.data
          : res.data.data.list_absen.pulang
      )
    })
  }

  return (
    <div className='search-calendar'>
      <Search placeholder='Cari guru atau karyawan' setSearch={contextSearch.setSearch}/>
      <div className='wrapper-pilih-tanggal'>
        <PilihTanggal 
          text={context.startText} 
          funcText={context.setStartText} 
          funcTime={context.setStartTime} 
          funcTanggal={context.setStartTanggal} 
          value={context.startTanggal} 
          setStartTime={contextListAbsen.setStartTime}
        />
        <img src={calenderIcon} alt="" />
        <PilihTanggal 
          text={context.endText} 
          funcText={context.setEndText} 
          funcTime={context.setEndTime} 
          funcTanggal={context.setEndTanggal} 
          value={context.endTanggal} 
          setEndTime={contextListAbsen.setEndTime}
        />
      </div>
      <button 
        // disabled={context.endText === 'Tanggal mulai' ? true : false} 
        className='btn-search' onClick={handleSearch}><img src={searchIcon} alt="" /></button>
    </div>
  )
}

export default SearchAndCalendar