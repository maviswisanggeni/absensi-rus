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
        {isDisplayMessage &&
          <InfoBox
            message={messageResApi}
            status={statusResApi}
            isDisplay={isDisplayMessage}
            setIsDisplay={updateStateKalender}
            stateName='isDisplayMessage'
          />
        }
        <CalendarHeader />
        <div className='sidebar-month'>
          <div className='container-days'>
            <p className='day'>Minggu</p>
            <p className='day'>Senin</p>
            <p className='day'>Selasa</p>
            <p className='day'>Rabu</p>
            <p className='day'>Kamis</p>
            <p className='day'>Jum'at</p>
            <p className='day'>Sabtu</p>
          </div>
          <Month month={currentMonth} />
        </div>
      </div>
    </div>
  )
}

export default Kalender