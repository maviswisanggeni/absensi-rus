import React from 'react'
import Select from 'react-select'
import { useApiKehadiranSearch } from '../contexts/api/ContextApiKehadiranSearch'

function Search() {
  const context = useApiKehadiranSearch()

  const options = context.listSearch?.map((item) => {
      return {value: item?.user?.id, label: item?.user?.nama}
  })
    
  function handleChange(e){
    context.setSearch(e?.value)
  }

  return (
    // <input type="text" placeholder='Cari Guru / Karyawan' className='search'/>
    <Select options={options} isSearchable={true} onChange={(e) => handleChange(e)} className='search'/>
    )
}

export default Search