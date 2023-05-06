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
import { useKehadiranJmlKehadiran } from '../contexts/api/kehadiran/ContextApiKehadiran'
import { TanggalKehadiranProvider } from '../contexts/app/ContextTanggalKehadiran'
import { useKehadiranListAbsensi } from '../contexts/api/kehadiran/ContextApiKehadiranListData'

function Kehadiran() {
  const context = useKehadiranJmlKehadiran()
  return (
    <>
      <TanggalKehadiranProvider>
        <div className='kehadiran dashboard-and-kehadiran'>
          <h1>Kehadiran karyawan</h1>
          <div className='wrapper-circular'>

            <CircularStatistic
              name="Masuk"
              firstValue={context.jmlKehadiran?.jml_masuk}
              secondValue={context.jmlKehadiran?.jml_karyawan}
              uiValue={context.loading ? <p className='p2'>{`${context.jmlKehadiran?.jml_masuk} / ${context.jmlKehadiran?.jml_karyawan}`}</p> : <div className='dots loading'></div>}
              imgSrc={masukIcon}
            />

            <CircularStatistic
              name="Keluar"
              firstValue={context.jmlKehadiran?.jml_pulang}
              secondValue={context.jmlKehadiran?.jml_karyawan}
              uiValue={context.loading ? <p className='p2'>{`${context.jmlKehadiran?.jml_pulang} / ${context.jmlKehadiran?.jml_karyawan}`}</p> : <div className='dots loading'></div>}
              imgSrc={keluarIcon}
            />

            <CircularStatistic
              name="Absen"
              firstValue={context.jmlKehadiran?.jml_absen}
              secondValue={context.jmlKehadiran?.jml_karyawan}
              uiValue={context.loading ? <p className='p2'>{`${context.jmlKehadiran?.jml_absen}`} Orang</p> : <div className='dots loading'></div>}
              imgSrc={absenIcon}
            />
          </div>
          <SearchAndCalendar />
          <TabbarAndFilter />
          <Table />
        </div>
        <div className='sidebar-right'>
          <Profile />
          <Calender tanggal={context.setTanggal} bulan={context.setBulan} tahun={context.setTahun} 
            setStartTime={context.setStartTime}
          />
          <KehadiranTerbaru />
        </div>
      </TanggalKehadiranProvider>
    </>
  )
}

export default Kehadiran