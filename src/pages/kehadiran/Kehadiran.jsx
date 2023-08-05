import React, { useState } from 'react'
import CircularStatistic from '../../components/dashboard/CircularStatistic'
import masukIcon from '../../assets/icons/masuk-icon.svg'
import izinIcon from '../../assets/icons/izin-icon.svg'
import absenIcon from '../../assets/icons/absen-icon.svg'
import Profile from '../../components/Profile';
import '../../styles/css/Kehadiran.css'
import SearchAndCalendar from '../../components/kehadiran/SearchAndCalendar'
import TabbarAndFilter from '../../components/kehadiran/TabbarAndFilter'
import Table from '../../components/kehadiran/Table'
import KehadiranTerbaru from '../../components/sidebar-right/KehadiranTerbaru'
import { useKehadiranJmlKehadiran } from '../../contexts/api/kehadiran/ContextApiKehadiran'
import { TanggalKehadiranProvider } from '../../contexts/app/ContextTanggalKehadiran'
import Sidebar from '../../components/sidebar/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getJmlKehadiranKehadiran, updateStateJmlKehadiran } from '../../features/jmlKehadiranSlice'
import { Route, Routes } from 'react-router'
import Pusher from "pusher-js";
import InfoBox from '../../components/InfoBox'
import CustomCalendar from '../../components/CustomCalendar'
import formatDate from '../../components/useFormatCalendar'
import { updateStateKehadiran } from '../../features/kehadiranSlice'
import LoadingTable from '../../components/LoadingTable'

function Kehadiran() {
  const context = useKehadiranJmlKehadiran()
  const dispatch = useDispatch()
  const { statusResApi, messageResApi, isDisplayMessage, listTabbar, loading: tableLoading } = useSelector((state) => state.kehadiran)
  const { jmlKehadiran, loading: jmlLoading, tanggalKehadiran } = useSelector(state => state.jmlKehadiran)
  const [date, setDate] = useState(new Date());
  const [isResetState, setIsResetState] = useState(false)

  useEffect(() => {
    dispatch(updateStateJmlKehadiran({
      name: 'tanggalKehadiran', value: formatDate(new Date())
    }))
    setIsResetState(true)
  }, [])

  useEffect(() => {
    if (isResetState) {
      dispatch(getJmlKehadiranKehadiran({ start_time: tanggalKehadiran }))
    }
  }, [tanggalKehadiran, isResetState])

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
    <div className='wrapper-kehadiran'>
      <Sidebar />
      <TanggalKehadiranProvider>
        <div className='kehadiran'>
          <div className='main-kehadiran'>
            <h1>Kehadiran karyawan</h1>
            <div className='wrapper-circular'>
              <CircularStatistic
                name="Kehadiran"
                firstValue={jmlKehadiran?.jumlah_kehadiran}
                secondValue={jmlKehadiran?.jumlah_karyawan}
                uiValue={`${jmlKehadiran?.jumlah_kehadiran} / ${jmlKehadiran?.jumlah_karyawan}`}
                imgSrc={masukIcon}
                loading={jmlLoading}
              />

              <CircularStatistic
                name="Izin"
                firstValue={jmlKehadiran?.jumlah_izin}
                secondValue={jmlKehadiran?.jumlah_karyawan}
                uiValue={`${jmlKehadiran?.jumlah_izin} Orang`}
                imgSrc={izinIcon}
                loading={jmlLoading}
              />

              <CircularStatistic
                name="Absen"
                firstValue={jmlKehadiran?.jumlah_absen}
                secondValue={jmlKehadiran?.jumlah_karyawan}
                uiValue={`${jmlKehadiran?.jumlah_absen} Orang`}
                imgSrc={absenIcon}
                loading={jmlLoading}
              />
            </div>
            <SearchAndCalendar />
            <TabbarAndFilter />
            {tableLoading
              ? <LoadingTable size={'small'} />
              : <Routes>
                {listTabbar.map((item, index) => {
                  return (
                    <Route key={index} path={`/${item.kategori}`} element={<Table />} />
                  )
                })}
              </Routes>
            }
          </div>
          <div className='sidebar-right'>
            <div className='wrapper-profile'>
              <Profile />
            </div>
            <div className='wrapper-calendar'>
              <CustomCalendar
                tanggal={date}
                setTanggal={setDate}
                stateName={'tanggalKehadiran'}
                setNonSerializableTanggal={updateStateJmlKehadiran}
              />
            </div>
            <KehadiranTerbaru />
          </div>
        </div>

        <InfoBox
          message={messageResApi}
          status={statusResApi}
          isDisplay={isDisplayMessage}
          setIsDisplay={updateStateKehadiran}
          stateName='isDisplayMessage'
        />
      </TanggalKehadiranProvider>
    </div>
  )
}

export default Kehadiran