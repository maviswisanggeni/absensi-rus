import React from 'react'

function Search({ placeholder, value, onChange, onKeyDown }) {
  return (
    <input className='search' value={value} onChange={onChange} placeholder={placeholder} onKeyDown={onKeyDown} />
  )
}

export default Search