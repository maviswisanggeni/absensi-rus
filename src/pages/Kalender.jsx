import React, { useContext, useEffect, useState } from 'react'
import '../styles/css/Kalendar.css'
import { getMonth } from '../datas/util'
import CalendarHeader from '../components/kalender/CalendarHeader';
import Month from '../components/kalender/Month';
import GlobalCalendar from '../contexts/app/GlobalCalendar';
import EventModal from '../components/kalender/EventModal';
import Sidebar from '../components/sidebar/Sidebar';

function Kalender() {
  const [currentMonth, setCurrentMonth] = useState(getMonth())
  const { monthIndex, showEventModal } = useContext(GlobalCalendar)

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex))
  }, [monthIndex])

  return (
    <div className='wrapper-kalender'>
      <Sidebar />
      <div className='kalender'>
        {showEventModal && <EventModal />}
        <CalendarHeader />
        <div className='sidebar-month'>
          {/* <Sidebar/> */}
          <Month month={currentMonth} />
        </div>
      </div>
    </div>
  )
}

export default Kalender