import React from 'react'
import CircularStatistic from '../components/dashboard/CircularStatistic'
import masukIcon from '../assets/icons/masuk-icon.svg'
import keluarIcon from '../assets/icons/keluar-icon.svg'
import absenIcon from '../assets/icons/absen-icon.svg'
import Profile from '../components/Profile';
import '../styles/css/Kehadiran.css'
import SearchAndCalendar from '../components/kehadiran/SearchAndCalendar'
import TabbarAndFilter from '../components/kehadiran/TabbarAndFilter'
import Table from '../components/kehadiran/Table'
import Calender from '../components/CustomCalendar'
import KehadiranTerbaru from '../components/sidebar-right/KehadiranTerbaru'
import { ContextApiKehadiranJmlKehadiran } from '../contexts/api/ContextApiKehadiran'
import { useContext } from 'react'

function Kehadiran() {
  const [jmlKehadiran] = useContext(ContextApiKehadiranJmlKehadiran)
  return (
    <>
      <div className='kehadiran dashboard-and-kehadiran'>
        <h1>Kehadiran karyawan</h1>
        <div className='wrapper-circular'>
          <CircularStatistic name="Masuk" firstValue={jmlKehadiran?.jml_masuk} secondValue={jmlKehadiran?.jml_karyawan} uiValue={`${jmlKehadiran?.jml_masuk} / ${jmlKehadiran?.jml_karyawan}`} imgSrc={masukIcon}/>
          <CircularStatistic name="Keluar" firstValue={jmlKehadiran?.jml_pulang} secondValue={jmlKehadiran?.jml_karyawan} uiValue={`${jmlKehadiran?.jml_pulang} / ${jmlKehadiran?.jml_karyawan}`} imgSrc={keluarIcon}/>
          <CircularStatistic name="Absen"firstValue={jmlKehadiran?.jml_absen} secondValue={jmlKehadiran?.jml_karyawan} uiValue={`${jmlKehadiran?.jml_absen}`} imgSrc={absenIcon}/>
        </div>
        <SearchAndCalendar/>
        <TabbarAndFilter/>
        <Table/>
      </div>
      <div className='sidebar-right'>
        <Profile/>
        <Calender/>
        <KehadiranTerbaru/>
      </div>
    </>
  )
}

export default Kehadiran