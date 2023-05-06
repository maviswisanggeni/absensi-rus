import React from 'react'
import arrowLeft from '../../assets/icons/arrow-left.svg'
import trashWhite from '../../assets/icons/trashWhite.svg'
import { useNavigate } from 'react-router'

function NavKalender() {
  let navigate = useNavigate()
  return (
    <div className='nav-kalender'>
      <div className='wrapper-back-btn'>
        <img src={arrowLeft} onClick={() => navigate(-1)} alt="" />
        <h1>Tambah Event</h1>
      </div>
      <div className='wrapper-action-btn'>
        <button>
          <img src={trashWhite} alt="" />
        </button>
        <input
          type="submit" value='Konfirmasi' className='btn-submit' />
      </div>
    </div>
  )
}

export default NavKalender