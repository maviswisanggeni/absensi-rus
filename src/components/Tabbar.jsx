import React, { useState } from 'react'
import { useEffect } from 'react';
import { useApiKaryawan } from '../contexts/api/karyawan/ContextApiKaryawan';
import { useKehadiranListAbsensi } from '../contexts/api/kehadiran/ContextApiKehadiranListData';

function Tabbar(props) {
  const context = useKehadiranListAbsensi()
  const contextKaryawan = useApiKaryawan()
  const [current, setCurrent] = useState(props.option1)

  function handleClick(e) {
    setCurrent(e.target.innerText)
    context.setCurrentPage(1)
  }
  
  useEffect(() => {
    contextKaryawan.setKeterangan(current === 'Guru' ? true : false)
    context.setKeterangan(current === 'Keluar' ? 'Pulang' : 'Masuk')
  }, [current])

  return (
    <div className='tabbar'>
      <div className='tabbar-text'>
        <div onClick={handleClick} className={current === props.option1 ? 'active' : ''}>{props.option1}</div>
        <div onClick={handleClick} className={current === props.option2 ? 'active' : ''}>{props.option2}</div>
      </div>
      <div className={`line ${current === props.option1 ? '' : 'active'}`}></div>
    </div>
  )
}

export default Tabbar