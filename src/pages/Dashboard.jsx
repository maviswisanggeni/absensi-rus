import React from 'react'
import '../styles/css/Dashboard.css'
import CircularStatistic from '../components/dashboard/CircularStatistic'
import masukIcon from '../assets/icons/masuk-icon.svg'
import keluarIcon from '../assets/icons/keluar-icon.svg'
import absenIcon from '../assets/icons/absen-icon.svg'
import StatisticChart from '../components/dashboard/StatisticChart'
import Profile from '../components/Profile';
import Jadwal from '../components/sidebar-right/Jadwal'
import Calender from '../components/CustomCalendar'
import { ContextApiDashboard } from '../contexts/api/ContextApiDashboard'
import { useContext } from 'react'

function Dashboard() {
  const [jmlKehadiran] = useContext(ContextApiDashboard)
  return (
    <>
      <div className='dashboard dashboard-and-kehadiran'>
        <h1>Dashboard</h1>
        <div className='wrapper-circular'>
          <CircularStatistic name="Masuk" firstValue={jmlKehadiran?.jml_masuk} secondValue={jmlKehadiran?.jml_karyawan} uiValue={`${jmlKehadiran?.jml_masuk} / ${jmlKehadiran?.jml_karyawan}`} imgSrc={masukIcon}/>
          <CircularStatistic name="Keluar" firstValue={jmlKehadiran?.jml_pulang} secondValue={jmlKehadiran?.jml_karyawan} uiValue={`${jmlKehadiran?.jml_pulang} / ${jmlKehadiran?.jml_karyawan}`} imgSrc={keluarIcon}/>
          <CircularStatistic name="Absen"firstValue={jmlKehadiran?.jml_absen} secondValue={jmlKehadiran?.jml_karyawan} uiValue={`${jmlKehadiran?.jml_absen}`} imgSrc={absenIcon}/>
        </div>
        <StatisticChart/>
      </div>

      <div className='sidebar-right'>
        <Profile/>
        <Calender/>
        <Jadwal/>
      </div>
    </>
  )
}

export default Dashboard