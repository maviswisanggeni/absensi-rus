import React from 'react'
import Select from 'react-select'
import { useApiKehadiranSearch } from '../contexts/api/kehadiran/ContextApiKehadiranSearch'

function Search() {
  const context = useApiKehadiranSearch()

  const options = context.listSearch?.map((item) => {
      return {value: item?.user?.id, label: item?.user?.nama}
  })
    
  function handleChange(e){
    context.setSearch(e?.value)
  }

  return (
    <Select options={options} isSearchable={true} onChange={(e) => handleChange(e)} className='search'
      styles={{
        container: (provided) => ({
          ...provided,
          width: '100%',
          height: '100%',
          margin: '0',
          padding: '0',
          border: 'none',
          outline: 'none',
          borderRadius: '0',
          backgroundColor: 'transparent',
          boxShadow: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        }),
      }}
    />
    )
}

export default Search