import React from 'react'
import Search from '../Search'
import PilihTanggal from './PilihTanggal'
import calenderIcon from '../../assets/icons/arrow-right.svg'

function SearchAndCalendar() {
  return (
    <div className='search-calendar'>
        <Search/>
        <div className='wrapper-pilih-tanggal'>
          <PilihTanggal text='Tanggal mulai'/>
          <img src={calenderIcon} alt="" />
          <PilihTanggal text='Tanggal berakhir'/>
        </div>
    </div>
  )
}

export default SearchAndCalendar