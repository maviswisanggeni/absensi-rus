import React, { useState } from 'react'
import { useEffect } from 'react';
import { useApiKaryawan } from '../contexts/api/karyawan/ContextApiKaryawan';
import { useKehadiranListAbsensi } from '../contexts/api/kehadiran/ContextApiKehadiranListData';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Tabbar({ option1, option2, funcPage, funcKeterangan }) {
  const contextKaryawan = useApiKaryawan()
  const dispatch = useDispatch()
  const [current, setCurrent] = useState(option1)
  let location = useLocation();
  const navigate = useNavigate();

  function handleClick(e) {
    setCurrent(e.target.innerText)
    funcPage(1)
  }

  useEffect(() => {
    // contextKaryawan.setKeterangan(current === 'Guru' ? true : false)
    if(current === 'Keluar'){
      dispatch(funcKeterangan('Pulang'))
    }else if(current === 'Masuk'){
      dispatch(funcKeterangan('Masuk'))
    }else if(current === 'Staff'){
      dispatch(funcKeterangan(false))
    }else{
      dispatch(funcKeterangan(true))
    }
  }, [current, location])

  return (
    <div className='tabbar'>
      <div className='tabbar-text'>
          <div onClick={handleClick} className={current === option1 ? 'active' : ''}>{option1}</div>
          <div onClick={handleClick} className={current === option2 ? 'active' : ''}>{option2}</div>
      </div>
      <div className={`line ${current === option1 ? '' : 'active'}`}></div>
    </div>
  )
}

export default Tabbar