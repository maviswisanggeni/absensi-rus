import React, { useContext, useEffect, useState } from 'react'
import '../../styles/css/Kalendar.css'
import { getMonth } from '../../utils/getMonth'
import CalendarHeader from '../../components/kalender/CalendarHeader';
import Month from '../../components/kalender/Month';
import GlobalCalendar from '../../contexts/app/GlobalCalendar';
import Sidebar from '../../components/sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getKalender, updateStateKalender } from '../../features/kalenderSlice';
import InfoBox from '../../components/InfoBox';
import { useSearchParams } from 'react-router-dom';

function Kalender() {
  const [currentMonth, setCurrentMonth] = useState(getMonth())
  const { monthIndex, setMonthIndex } = useContext(GlobalCalendar)
  const { statusResApi, messageResApi, isDisplayMessage, listEvent } = useSelector(state => state.kalender)
  const dispatch = useDispatch()
  const [params, setParams] = useSearchParams()

  useEffect(() => {
    dispatch(getKalender(monthIndex + 1))
    setCurrentMonth(getMonth(monthIndex))
    setParams({ month: monthIndex + 1 })
  }, [monthIndex, dispatch])

  useEffect(() => {
    localStorage.setItem('selectedMonth', monthIndex);
  }, [monthIndex]);

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