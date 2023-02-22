import React from 'react'
import { Link } from 'react-router-dom'
import Tabbar from '../components/Tabbar'
import Profile from '../components/Profile'
import Search from '../components/Search'
import '../styles/css/Karyawan.css'
import Filter from '../components/Filter'
import Table from '../components/karyawan/Table'

function Karyawan() {

  return (
      <div className='karyawan'>
        <div className='search-and-profile'>
          <Search/>
          <Profile/>
        </div>

        <div className='title-btn'>
          <h1>Karyawan</h1>
          <Link to='/karyawan/add'>+ Add New</Link>
        </div>

        <div className='tabbar-filter'>
          <Tabbar option1="Guru" option2="Staff"/>
          <div className='filter-angka'>
            <Filter option1="Sesuai abjad" option2="Urut NIY"/>
            <p>123 Guru</p>
          </div>
        </div>
        <Table/>
      </div>
  )
}

export default Karyawan