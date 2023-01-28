import React, { useContext } from 'react'
import Select from 'react-select'
import { ContextApiKehadiranList } from '../contexts/api/ContextApiKehadiranListData'

function Search() {
  const context = useContext(ContextApiKehadiranList)

  const options = context.listAbsensi?.data?.data?.map((item) => {
      return {value: item?.karyawan?.nama, label: item?.karyawan?.nama}
  })
    
  function handleChange(e){
    
  }

  return (
    // <input type="text" placeholder='Cari Guru / Karyawan' className='search'/>
    <Select options={options} isSearchable={true} onChange={(e) => handleChange(e)} className='search'/>
    )
}

export default Search