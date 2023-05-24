import React from 'react'
import { useDispatch } from 'react-redux'

function Search({ placeholder, setSearch, value }) {
  const dispatch = useDispatch()
  function handleChange(e) {
    dispatch(setSearch(e.target.value))
  }

  return (
    <input className='search' value={value} onChange={handleChange} placeholder={placeholder} />
  )
}

export default Search