import React from 'react'
import Sidebar from './sidebar/Sidebar'

function NotFound() {
  return (
    <div className='not-found'>
      <Sidebar />
      <div className='wrapper-not-found'>
        <h1>404</h1>
        <p>Maaf, halaman yang kamu cari tidak ditemukan.</p>
      </div>
    </div>
  )
}

export default NotFound