import React from 'react'
import CircularStatistic from '../components/dashboard/CircularStatistic'
import masukIcon from '../assets/icons/masuk-icon.svg'
import keluarIcon from '../assets/icons/keluar-icon.svg'
import absenIcon from '../assets/icons/absen-icon.svg'
import Profile from '../components/Profile';
import '../styles/css/Kehadiran.css'

function Kehadiran() {
  return (
    <>
      <div className='kehadiran dashboard-and-kehadiran'>
        <h1>Kehadiran karyawan</h1>
        <div className='wrapper-circular'>
          <CircularStatistic name="Masuk" value="240 / 310" imgSrc={masukIcon}/>
          <CircularStatistic name="Keluar" value="142 / 240" imgSrc={keluarIcon}/>
          <CircularStatistic name="Absen" value="64 Orang" imgSrc={absenIcon}/>
        </div>
      </div>
      <div className='sidebar-right'>
        <Profile/>
      </div>
    </>
  )
}

export default Kehadiran