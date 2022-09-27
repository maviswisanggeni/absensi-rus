import React from 'react'
import CircularStatistic from '../components/dashboard/CircularStatistic'
import Profile from '../components/Profile'
import Search from '../components/Search'
import masukIcon from '../assets/icons/masuk-icon.svg'
import keluarIcon from '../assets/icons/keluar-icon.svg'
import absenIcon from '../assets/icons/absen-icon.svg'
import StatisticChart from '../components/dashboard/StatisticChart'

function Dashboard() {
  return (
    <div className='dashboard'>
      <Search/>
      <h1>Dashboard</h1>
      <div className='wrapper-circular'>
        <CircularStatistic name="Masuk" value="240 / 310" imgSrc={masukIcon}/>
        <CircularStatistic name="Keluar" value="142 / 240" imgSrc={keluarIcon}/>
        <CircularStatistic name="Absen" value="64 Orang" imgSrc={absenIcon}/>
      </div>
      <StatisticChart/>
    </div>
  )
}

export default Dashboard