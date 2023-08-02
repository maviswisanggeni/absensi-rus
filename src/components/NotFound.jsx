import React from 'react'
import Sidebar from './sidebar/Sidebar'
import notFOund from '../assets/icons/not-found.svg'
import Button from './Button'
import { useNavigate } from 'react-router'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className='not-found'>
      <Sidebar />
      <div className='wrapper-not-found'>
        <img src={notFOund} alt="" />
        <h1>Halaman tidak ada</h1>
        <p>Maaf, halaman yang kamu cari tidak ditemukan.</p>
        <Button onClick={() => navigate(-1)} text={'Kembali'} />
      </div>
    </div>
  )
}

export default NotFound