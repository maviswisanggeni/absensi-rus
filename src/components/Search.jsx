import React from 'react'

function Search({placeholder, setSearch, value}) {

  function handleChange(e){
    setSearch(e.target.value)
  }

  return (
    <input className='search' value={value} onChange={handleChange} placeholder={placeholder}/>
  )
}

export default Search