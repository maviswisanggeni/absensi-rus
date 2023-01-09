import React from 'react'
import Search from '../Search'
import PilihTanggal from './PilihTanggal'
import calenderIcon from '../../assets/icons/arrow-right.svg'
import { useTanggalKehadiran } from '../../contexts/app/ContextTanggalKehadiran'

function SearchAndCalendar() {
  const context = useTanggalKehadiran()
  return (
    <div className='search-calendar'>
        <Search/>
        <div className='wrapper-pilih-tanggal'>
          <PilihTanggal text={context.startText} funcText={context.setStartText} funcTime={context.setStartTime} funcTanggal={context.setStartTanggal} value={context.startTanggal}/>
          <img src={calenderIcon} alt="" />
          <PilihTanggal text={context.endText} funcText={context.setEndText} funcTime={context.setEndTime} funcTanggal={context.setEndTanggal} value={context.endTanggal}/>
        </div>
    </div>
  )
}

export default SearchAndCalendar