import React, { useEffect, useState } from 'react'
import '../styles/css/Dashboard.css'
import CircularStatistic from '../components/dashboard/CircularStatistic'
import masukIcon from '../assets/icons/masuk-icon.svg'
import izinIcon from '../assets/icons/izin-icon.svg'
import absenIcon from '../assets/icons/absen-icon.svg'
import StatisticChart from '../components/dashboard/StatisticChart'
import Profile from '../components/Profile';
import Jadwal from '../components/sidebar-right/Jadwal'
import Calender from '../components/CustomCalendar'
import Sidebar from '../components/sidebar/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getJmlKehadiranDashboard, setJmlKehadiran } from '../features/jmlKehadiranSlice'
import Pusher from "pusher-js";

function Dashboard() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getJmlKehadiranDashboard())
  }, [dispatch])

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
    <div className='wrapper-dashboard'>
      <Sidebar />
      <div className='dashboard dashboard-and-kehadiran'>
        <h1>Dashboard</h1>
        <div className='wrapper-circular'>
          <CircularStatistic
            name="Masuk"
            firstValue={jmlKehadiran?.jumlah_masuk}
            secondValue={jmlKehadiran?.jumlah_karyawan}
            uiValue={loading ? <p className='p2'>{`${jmlKehadiran?.jumlah_masuk} / ${jmlKehadiran?.jumlah_karyawan}`}</p> : <div className='dots loading'></div>}
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
        <StatisticChart />
      </div>

      <div className='sidebar-right'>
        <Profile />
        <div className='wrapper-calendar'>
          <Calender />
        </div>
        <Jadwal />
      </div>
    </div>
  )
}

export default Dashboard