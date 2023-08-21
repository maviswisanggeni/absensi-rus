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
  const { monthIndex, year, setYear } = useContext(GlobalCalendar)
  const { statusResApi, messageResApi, isDisplayMessage, listEvent } = useSelector(state => state.kalender)
  const dispatch = useDispatch()
  const [params, setParams] = useSearchParams()

  useEffect(() => {
    dispatch(getKalender({
      bulan: monthIndex + 1,
      tahun: year
    }))

    setCurrentMonth(getMonth(monthIndex))
    setParams({ month: monthIndex + 1, year: year })
  }, [monthIndex, year, dispatch])

  useEffect(() => {
    localStorage.setItem('selectedMonth', monthIndex);
    localStorage.setItem('selectedYear', year);
  }, [monthIndex, year]);

  return (
    <div className='wrapper-kalender'>
      <Sidebar />
      <div className='kalender'>
        <CalendarHeader />
        <div className='sidebar-month'>
          <div className='container-days'>
            <p className='day'>Minggu</p>
            <p className='day'>Senin</p>
            <p className='day'>Selasa</p>
            <p className='day'>Rabu</p>
            <p className='day'>Kamis</p>
            <p className='day'>Jumat</p>
            <p className='day'>Sabtu</p>
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