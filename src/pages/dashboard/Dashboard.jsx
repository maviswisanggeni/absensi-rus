import React, { useEffect, useState } from 'react'
import '../../styles/css/Dashboard.css'
import CircularStatistic from '../../components/dashboard/CircularStatistic'
import masukIcon from '../../assets/icons/masuk-icon.svg'
import izinIcon from '../../assets/icons/izin-icon.svg'
import absenIcon from '../../assets/icons/absen-icon.svg'
import StatisticChart from '../../components/dashboard/StatisticChart'
import Profile from '../../components/Profile';
import Jadwal from '../../components/dashboard/Jadwal'
import Calender from '../../components/CustomCalendar'
import Sidebar from '../../components/sidebar/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getJmlKehadiranDashboard, updateStateJmlKehadiran } from '../../features/jmlKehadiranSlice'
import Pusher from "pusher-js";
import InfoBox from '../../components/InfoBox'
import formatDate from '../../utils/formatDate'

function Dashboard() {
  const dispatch = useDispatch()
  const { statusResApi, messageResApi, isDisplayMessage, tanggalDashboard } = useSelector(state => state.jmlKehadiran)
  const { jmlKehadiran, loading } = useSelector(state => state.jmlKehadiran)
  const [date, setDate] = useState(new Date())
  const [isResetState, setIsResetState] = useState(false)

  useEffect(() => {
    dispatch(updateStateJmlKehadiran({
      name: 'tanggalDashboard', value: formatDate(new Date())
    }))
    setIsResetState(true)
  }, [])

  useEffect(() => {
    if (isResetState) {
      dispatch(getJmlKehadiranDashboard(tanggalDashboard))
    }
  }, [tanggalDashboard, isResetState])

  // useEffect(() => {
  //   Pusher.logToConsole = true;

  //   const pusher = new Pusher('', {
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

  return (
    <div className='wrapper-dashboard'>
      <Sidebar />
      <div className='dashboard'>
        <div className='main-dashboard'>
          <h1>Dashboard</h1>
          <div className='wrapper-circular'>
            <CircularStatistic
              name="Masuk"
              firstValue={jmlKehadiran?.jumlah_masuk}
              secondValue={jmlKehadiran?.jumlah_karyawan}
              uiValue={`${jmlKehadiran?.jumlah_masuk} / ${jmlKehadiran?.jumlah_karyawan}`}
              imgSrc={masukIcon}
              loading={loading}
            />

            <CircularStatistic
              name="Izin"
              firstValue={jmlKehadiran?.jumlah_izin}
              secondValue={jmlKehadiran?.jumlah_karyawan}
              uiValue={`${jmlKehadiran?.jumlah_izin} Orang`}
              imgSrc={izinIcon}
              loading={loading}
            />

            <CircularStatistic
              name="Absen"
              firstValue={jmlKehadiran?.jumlah_absen}
              secondValue={jmlKehadiran?.jumlah_karyawan}
              uiValue={`${jmlKehadiran?.jumlah_absen} Orang`}
              imgSrc={absenIcon}
              loading={loading}
            />
          </div>
          <StatisticChart />
        </div>

        <div className='sidebar-right'>
          <Profile />
          <div className='wrapper-calendar'>
            <Calender
              tanggal={date}
              setTanggal={setDate}
              stateName={'tanggalDashboard'}
              setNonSerializableTanggal={updateStateJmlKehadiran}
            />
          </div>
          <Jadwal />
        </div>
      </div>

      <InfoBox
        message={messageResApi}
        status={statusResApi}
        isDisplay={isDisplayMessage}
        setIsDisplay={updateStateJmlKehadiran}
        stateName='isDisplayMessage'
      />
    </div>
  )
}

export default Dashboard