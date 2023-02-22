import React, { useContext } from 'react'
import logo from '../../assets/icons/rus-logo.svg'
import arrowLeft from '../../assets/icons/arrow-left.svg'
import GlobalCalendar from '../../contexts/app/GlobalCalendar'
import dayjs from 'dayjs'

export default function CalendarHeader() {
    const { monthIndex, setMonthIndex } = useContext(GlobalCalendar)
    function handlePrevMonth() {
        setMonthIndex(monthIndex - 1);
      }
      function handleNextMonth() {
        setMonthIndex(monthIndex + 1);
      }

    function handleReset() {
        setMonthIndex(
        monthIndex === dayjs().month()
            ? monthIndex + Math.random()
            : dayjs().month()
        );
  }
  return (
    <header className='px-4 py-2 flex item-center header'>
        <h1 className='mr-10 text-xl text-gray-500'>Calendar</h1>
        <button className='today' onClick={handleReset}>Today</button>
        <button>
            <img className='arrow' src={arrowLeft} onClick={handlePrevMonth}/>
            <img className='arrow' src={arrowLeft} onClick={handleNextMonth}/>
        </button>
        <h2 className='h2'>
            {dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY'
            )}
        </h2>
    </header>
  )
}
