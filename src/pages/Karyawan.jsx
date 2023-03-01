import React from 'react'
import { Link } from 'react-router-dom'
import Tabbar from '../components/Tabbar'
import Profile from '../components/Profile'
import Search from '../components/Search'
import '../styles/css/Karyawan.css'
import Filter from '../components/Filter'
import Table from '../components/karyawan/Table'
import { useApiKaryawan } from '../contexts/api/karyawan/ContextApiKaryawan'

function Karyawan() {
  const context = useApiKaryawan()

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
          <Tabbar option1="Guru" option2="Staff" funcPage={context.setCurrentPage} funcKeterangan={context.setKeterangan}/>
          <div className='filter-angka'>
            <Filter option1="Sesuai abjad" option2="Urut NIY"
              setState={context.setUrutan} 

              list1={context.listPengajar}
              list2={context.listStaff}
              setlist1={context.setListPengajar}
              setlist2={context.setListStaff}
            />
            <p>{context.keterangan ? context.listPengajar.length : context.listStaff.length} Guru</p>
          </div>
        </div>
        <Table/>
      </div>
  )
}

export default Karyawan