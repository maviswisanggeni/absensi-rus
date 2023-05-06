import React from 'react'
import { Link } from 'react-router-dom'
import Tabbar from '../components/Tabbar'
import Profile from '../components/Profile'
import Search from '../components/Search'
import '../styles/css/Karyawan.css'
import Filter from '../components/Filter'
import Table from '../components/karyawan/Table'
import { useApiKaryawan } from '../contexts/api/karyawan/ContextApiKaryawan'
import { useState } from 'react'
import searchIcon from '../assets/icons/search-icon.svg'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { tabbarToggle } from '../features/karyawanSlice'

function Karyawan() {
  const { keterangan, listPengajar, listStaff } = useSelector(state => state.karyawan)
  console.log(keterangan)
  const context = useApiKaryawan()
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const token = localStorage.getItem("token");
  function searchKaryawan() {
    const url = "https://absensiguru.smkrus.com/api/karyawan"
    setLoading(false);
    axios.get(url, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                search: search
            }
        })
        .then((response) => {
          context.setListKaryawan(response.data);
          context.setListPengajar(response.data.pengajar)
          context.setListStaff(response.data.staff)
          setLoading(true);
        }).catch((error) => {
            console.log(error);
        })
  }
  return (
      <div className='karyawan'>
        <div className='search-and-profile'>
          <div className='wrap-search'>
            <Search placeholder='Cari guru atau karyawan' setSearch={setSearch}/>
            <button className='btn-search' onClick={searchKaryawan}><img src={searchIcon} alt="" /></button>
          </div>
          <Profile/>
        </div>

        <div className='title-btn'>
          <h1>Karyawan</h1>
          <Link to='/karyawan/add'>+ Add New</Link>
        </div>

        <div className='tabbar-filter'>
          <Tabbar option1="Guru" option2="Staff" funcPage={context.setCurrentPage} funcKeterangan={tabbarToggle}/>
          <div className='filter-angka'>
            <Filter option1="Sesuai abjad" option2="Urut NIY"
              setState={context.setUrutan} 
              list1={context.listPengajar}
              list2={context.listStaff}
              setlist1={context.setListPengajar}
              setlist2={context.setListStaff}
            />
            <p>{keterangan ? listPengajar.length : listStaff.length} Guru</p>
          </div>
        </div>
        <Table/>
      </div>
  )
}

export default Karyawan