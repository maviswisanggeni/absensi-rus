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
import { useApiDashboard } from '../contexts/api/dashboard/ContextApiDashboard'

function Dashboard() {
  const context = useApiDashboard()
  return (
    <>
      <div className='dashboard dashboard-and-kehadiran'>
        <h1>Dashboard</h1>
        <div className='wrapper-circular'>
          <CircularStatistic
              name="Masuk" 
              firstValue={context.jmlKehadiran?.jml_masuk}
              secondValue={context.jmlKehadiran?.jml_karyawan} 
              uiValue={context.loading ? <p className='p2'>{`${context.jmlKehadiran?.jml_masuk} / ${context.jmlKehadiran?.jml_karyawan}`}</p> : <div className='dots'></div>} 
              imgSrc={masukIcon}
            />

          <CircularStatistic 
            name="Keluar" 
            firstValue={context.jmlKehadiran?.jml_pulang} 
            secondValue={context.jmlKehadiran?.jml_karyawan} 
            uiValue={context.loading ? <p className='p2'>{`${context.jmlKehadiran?.jml_pulang} / ${context.jmlKehadiran?.jml_karyawan}`}</p> : <div className='dots'></div>} 
            imgSrc={keluarIcon}
          />

          <CircularStatistic 
            name="Absen"
            firstValue={context.jmlKehadiran?.jml_absen} 
            secondValue={context.jmlKehadiran?.jml_karyawan} 
            uiValue={context.loading ? <p className='p2'>{`${context.jmlKehadiran  ?.jml_absen}`} Orang</p> : <div className='dots'></div>} 
            imgSrc={absenIcon}
          />
        </div>
        <StatisticChart/>
      </div>

      <div className='sidebar-right'>
        <Profile/>
        <Calender func={context.setDate}/>
        <Jadwal/>
      </div>
    </>
  )
}

export default Dashboard