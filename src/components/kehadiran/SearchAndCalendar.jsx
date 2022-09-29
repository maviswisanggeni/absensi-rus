import React from 'react'
import Search from '../Search'
import PilihTanggal from './PilihTanggal'

function SearchAndCalendar() {
  return (
    <div className='search-calendar'>
        <Search/>
        <PilihTanggal/>
    </div>
  )
}

export default SearchAndCalendar