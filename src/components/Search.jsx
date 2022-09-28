import React, { useState } from 'react'

function Search() {
    // const [hide, setHide] = useState(false)
    // function hideIcon(e) {
    //     console.log(e.target.value);
    //     if (e.target.value === '') {
    //         setHide(false)
    //     }else{
    //         setHide(true)
    //     }
    // }
  return (
    // <input type="text" placeholder='Cari Guru / Karyawan' className={`search ${hide ? 'hide' : ''}`} onChange={(e) => hideIcon(e)}/>
    <input type="text" placeholder='Cari Guru / Karyawan' className={`search`}/>
  )
}

export default Search