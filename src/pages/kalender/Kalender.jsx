import React, { useContext, useEffect, useState } from 'react'
import '../../styles/css/Kalendar.css'
import { getMonth } from '../../datas/util'
import CalendarHeader from '../../components/kalender/CalendarHeader';
import Month from '../../components/kalender/Month';
import GlobalCalendar from '../../contexts/app/GlobalCalendar';
import Sidebar from '../../components/sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getKalender, updateStateKalender } from '../../features/kalenderSlice';
import InfoBox from '../../components/InfoBox';

function Kalender() {
  const [currentMonth, setCurrentMonth] = useState(getMonth())
  const { monthIndex, showEventModal } = useContext(GlobalCalendar)
  const { statusResApi, messageResApi, isDisplayMessage } = useSelector(state => state.kalender)
  const dispatch = useDispatch()

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
            <p className='day'>Sunday</p>
            <p className='day'>Monday</p>
            <p className='day'>Tuesday</p>
            <p className='day'>Wednesday</p>
            <p className='day'>Thursday</p>
            <p className='day'>Friday</p>
            <p className='day'>Saturday</p>
          </div>
          <Month month={currentMonth} />
        </div>
      </div>
      <InfoBox
        message={messageResApi}
        status={statusResApi}
        isDisplay={isDisplayMessage}
        setIsDisplay={updateStateKalender}
        stateName='isDisplayMessage'
      />
    </div>
  )
}

export default Kalender