import React, { useEffect, useLayoutEffect } from 'react'
import Search from '../Search'
import PilihTanggal from './PilihTanggal'
import calenderIcon from '../../assets/icons/arrow-right.svg'
import { useTanggalKehadiran } from '../../contexts/app/ContextTanggalKehadiran'
import searchIcon from '../../assets/icons/search-icon.svg'
import { useKehadiranListAbsensi } from '../../contexts/api/kehadiran/ContextApiKehadiranListData'
import formatDate from '../useFormatCalendar'

function SearchAndCalendar() {
  const context = useTanggalKehadiran()
  const contextListAbsen = useKehadiranListAbsensi()

  useEffect(() => {
    contextListAbsen.setSearch(
      contextListAbsen.searchParams.get('search') ? contextListAbsen.searchParams.get('search') : ''
    )
    contextListAbsen.setStartTime(
      contextListAbsen.searchParams.get('start_time') ? contextListAbsen.searchParams.get('start_time') : formatDate(new Date())
    )
    contextListAbsen.setEndTime(
      contextListAbsen.searchParams.get('end_time') === 'null' ? null : contextListAbsen.searchParams.get('end_time')
    )
    context.setStartText(
      contextListAbsen.searchParams.get('start_time') ? contextListAbsen.searchParams.get('start_time') : 'Tanggal mulai'
    )
    context.setEndText(
      contextListAbsen.searchParams.get('end_time') === 'null' || contextListAbsen.searchParams.get('end_time') === null
        ? 'Tanggal Berkahir' : contextListAbsen.searchParams.get('end_time')
    )
    contextListAbsen.getDataJmlKehadiran()
  }, [contextListAbsen.searchParams])

  async function handleSearch(e) {
    e.preventDefault()
    contextListAbsen.setSearchParams({
      'search': contextListAbsen.search,
      'start_time': contextListAbsen.startTime,
      'end_time': contextListAbsen.endTime
    })
    // contextListAbsen.setStartTime(context.startTime)
    // contextListAbsen.getDataJmlKehadiran()
  }

  return (
    <form className='search-calendar'>
      <Search placeholder='Cari guru atau karyawan' value={contextListAbsen.search}
        setSearch={contextListAbsen.setSearch}
      />
      <div className='wrapper-pilih-tanggal'>
        <PilihTanggal
          text={context.startText}
          setDate={context.setStartTanggal}
          setText={context.setStartText}
          setFormattedDate={context.setStartTime}
          value={context.startTanggal}
          setStartTime={contextListAbsen.setStartTime}
        />
        <img src={calenderIcon} alt="" />
        <PilihTanggal
          text={context.endText}
          setDate={context.setEndTanggal}
          setText={context.setEndText}
          setFormattedDate={context.setEndTime}
          value={context.endTanggal}
          setEndTime={contextListAbsen.setEndTime}
        />
      </div>
      <button
        className='btn-search' onClick={handleSearch}><img src={searchIcon} alt="" /></button>
    </form>
  )
}

export default SearchAndCalendar