import dayjs from 'dayjs'
import React, { useContext, useEffect, useState } from 'react'
import { getMonth } from '../../datas/util'
import arrowLeft from '../../assets/icons/arrow-left.svg'
import GlobalCalendar from '../../contexts/app/GlobalCalendar'

export default function SmallCalendar() {
    const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month())
    const [currentMonth, setCurrentMonth] = useState(getMonth())

    useEffect(() => {
        setCurrentMonth(getMonth(currentMonthIdx))
    }, [currentMonthIdx])

    const { monthIndex, setSmallCalendarMonth, setDaySelected } = useContext(GlobalCalendar)

    useEffect(() => {
        setCurrentMonthIdx(monthIndex)
    }, [monthIndex]) 

    function handlePrevMonth() {
        setCurrentMonthIdx(currentMonthIdx - 1)
    }

    function handleNextMonth() {
        setCurrentMonthIdx(currentMonthIdx + 1)
    }

    function getDayClass(day) { 
        const format = "DD-MM-YY";
        const nowDay = dayjs().format(format);
        const currDay = day.format(format);
        // const slcDay = daySelected && daySelected.format(format);
        if (nowDay === currDay) {
            return 'btn-today';
        } else {
            return
        }
      }

  return (
    <div className='small-calendar'>
        <header className='flex justify-between'>
            <p className='text-gray-500'>
                {dayjs(new Date(dayjs().year(), currentMonthIdx)).format('MMMM YYYY')}
            </p>
            <button>
                <img className='arrow' src={arrowLeft} onClick={handlePrevMonth}/>
                <img className='arrow' src={arrowLeft} onClick={handleNextMonth}/>
            </button>
        </header>
        <div className='grid grid-cols-7 grid-rows-6'>
        {currentMonth[0].map((day, i) => (
          <span key={i} className="text-sm py-1 text-center hari">
            {day.format("dd").charAt(0)}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx}
                onClick={() => {
                    setSmallCalendarMonth(currentMonthIdx);
                    setDaySelected(day);
                }}
                className={`py-1 w-full btn ${getDayClass(day)}`}>
                <span className="text-sm">{day.format("D")}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
        </div>
    </div>
  )
}
