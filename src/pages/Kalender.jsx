import React, { useContext, useEffect, useState } from 'react'
import '../styles/css/Kalendar.css'
import { getMonth } from '../datas/util'
import CalendarHeader from '../components/kalender/CalendarHeader';
import Month from '../components/kalender/Month';
import GlobalCalendar from '../contexts/app/GlobalCalendar';
import EventModal from '../components/kalender/EventModal';
import Sidebar from '../components/sidebar/Sidebar';
import { useDispatch } from 'react-redux';
import { getKalender } from '../features/kalenderSlice';

function Kalender() {
  const [currentMonth, setCurrentMonth] = useState(getMonth())
  const { monthIndex, showEventModal } = useContext(GlobalCalendar)
  const dispatch = useDispatch()

  useEffect(() => {
  }, [])

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex))
    dispatch(getKalender(monthIndex + 1))
  }, [monthIndex])

  return (
    <div className='wrapper-kalender'>
      <Sidebar />
      <div className='kalender'>
        <CalendarHeader />
        <div className='sidebar-month'>
          <div className='container-days'>
            <p className='day'>Senin</p>
            <p className='day'>Selasa</p>
            <p className='day'>Rabu</p>
            <p className='day'>Kamis</p>
            <p className='day'>Jum'at</p>
            <p className='day'>Sabtu</p>
            <p className='day'>Minggu</p>
          </div>
          <Month month={currentMonth} />
        </div>
      </div>
    </div>
  )
}

export default Kalender