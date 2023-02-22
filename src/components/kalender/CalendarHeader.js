import React, { useContext } from 'react'
import arrowLeft from '../../assets/icons/arrow-left.svg'
import arrow from '../../assets/icons/arrow-kalendar.svg'
import GlobalCalendar from '../../contexts/app/GlobalCalendar'
import dayjs from 'dayjs'

export default function CalendarHeader() {
    const { monthIndex, setMonthIndex, savedEvents } = useContext(GlobalCalendar)
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

  function handleClick(){
    console.log('fsdjii');
    localStorage.removeItem('savedEvents')
  }

  return (
    <header className='header'>
        {/* <button className='today' onClick={handleReset}>Today</button> */}
        {/* <h1 onClick={handleClick}>sjdfid</h1> */}
        <div>
            <img className='arrow' src={arrow} onClick={handlePrevMonth}/>
            <img className='arrow' src={arrow} onClick={handleNextMonth}/>
        </div>
        <h2 className='h2'>
            {dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}
        </h2>
    </header>
  )
}
