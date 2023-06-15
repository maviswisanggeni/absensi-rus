import React from 'react'
import CircularStatistic from '../components/dashboard/CircularStatistic'
import masukIcon from '../assets/icons/masuk-icon.svg'
import izinIcon from '../assets/icons/izin-icon.svg'
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
import Sidebar from '../components/sidebar/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getJmlKehadiranKehadiran, updateStateJmlKehadiran } from '../features/jmlKehadiranSlice'
import { Route, Routes } from 'react-router'
import Pusher from "pusher-js";
import InfoBox from '../components/InfoBox'

function Kehadiran() {
  const context = useKehadiranJmlKehadiran()
  const dispatch = useDispatch()
  const { tanggal } = useSelector((state) => state.jmlKehadiran)
  const { statusResApi, messageResApi, isDisplayMessage } = useSelector((state) => state.kehadiran)

  useEffect(() => {
    dispatch(getJmlKehadiranKehadiran(tanggal))
  }, [])

  // useEffect(() => {
  //   Pusher.logToConsole = true;

  //   const pusher = new Pusher('7b9c2c870e01322901d9', {
  //     cluster: 'ap1'
  //   });

  //   const channel = pusher.subscribe(`jml-kehadiran-channel`);
  //   channel.bind('jml-kehadiran-event', function (data) {
  //     dispatch(setJmlKehadiran(data))
  //   });

  //   return () => {
  //     pusher.unsubscribe('jml-kehadiran-channel')
  //   }
  // }, []);

  const { jmlKehadiran, loading } = useSelector(state => state.jmlKehadiran)

  return (
    <div className='wrapper-kehadiran'>
      <Sidebar />
      <TanggalKehadiranProvider>
        <div className='kehadiran dashboard-and-kehadiran'>
          <h1>Kehadiran karyawan</h1>
          <div className='wrapper-circular'>

            <CircularStatistic
              name="Kehadiran"
              firstValue={jmlKehadiran?.jumlah_kehadiran}
              secondValue={jmlKehadiran?.jumlah_karyawan}
              uiValue={loading ? <p className='p2'>{`${jmlKehadiran?.jumlah_kehadiran} / ${jmlKehadiran?.jumlah_karyawan}`}</p> : <div className='dots loading'></div>}
              imgSrc={masukIcon}
            />

            <CircularStatistic
              name="Izin"
              firstValue={jmlKehadiran?.jumlah_izin}
              secondValue={jmlKehadiran?.jumlah_karyawan}
              uiValue={loading ? <p className='p2'>{`${jmlKehadiran?.jumlah_izin}`} Orang</p> : <div className='dots loading'></div>}
              imgSrc={izinIcon}
            />

            <CircularStatistic
              name="Absen"
              firstValue={jmlKehadiran?.jumlah_absen}
              secondValue={jmlKehadiran?.jumlah_karyawan}
              uiValue={loading ? <p className='p2'>{`${jmlKehadiran?.jumlah_absen}`} Orang</p> : <div className='dots loading'></div>}
              imgSrc={absenIcon}
            />
          </div>
          <SearchAndCalendar />
          <TabbarAndFilter />
          <Routes>
            <Route path='/Masuk' element={<Table />} />
            <Route path='/Keluar' element={<Table />} />
            <Route path='/Izin' element={<Table />} />
          </Routes>
        </div>
        <div className='sidebar-right'>
          <div className='wrapper-profile'>
            <Profile />
          </div>
          <div className='wrapper-calendar'>
            <Calender tanggal={context.setTanggal} bulan={context.setBulan} tahun={context.setTahun}
              setStartTime={context.setStartTime}
            />
          </div>
          <KehadiranTerbaru />
        </div>

        <InfoBox
          message={messageResApi}
          status={statusResApi}
          isDisplay={isDisplayMessage}
          setIsDisplay={updateStateJmlKehadiran}
          stateName='isDisplayMessage'
        />
      </TanggalKehadiranProvider>
    </div>
  )
}

export default Kehadiran