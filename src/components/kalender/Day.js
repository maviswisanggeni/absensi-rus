import React, { useContext, useEffect, useState } from 'react'
import dayjs from "dayjs";
import GlobalCalendar from '../../contexts/app/GlobalCalendar';
import { useApiKalender } from '../../contexts/api/kalender/ContextApiKalender';

export default function Day({ day, rowIdx }) {

    const [dayEvents, setDayEvents] = useState([])
    const {setDaySelected, setShowEventModal, savedEvents, setSelectedEvent, selectedEvent} = useContext(GlobalCalendar)
    
    const context = useApiKalender()

    useEffect(() => {
        const events = context.listKalender.filter(evt => dayjs(evt.tanggal).format("DD-MM-YY") === day.format("DD-MM-YY"))
        setDayEvents(events)
    }, [savedEvents, day, context.loading, context.listKalender])

    function getCurrentDayClass() {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
          ? 'currentDay'
          : "";
    }

    return (
    <div className='day'>
        <header>
            {rowIdx === 0 && ( 
                <p className='days'>{day.format('dddd')}</p>
            )}
            <p className={'dd ' + getCurrentDayClass()}>{day.format('DD')}</p>
        </header>
        <div className='handle-add' onClick={() => {
            setDaySelected(day)
            setShowEventModal(true)
        }}>
            {dayEvents.map((evt, idx) => (
                <div key={idx} className='day-events' 
                style={{backgroundColor: evt?.is_libur === '1' ? "#21D2FF" : '#EA4D90'}} 
                onClick={() => setSelectedEvent(evt)}>
                    {context.loading ? evt.judul : 'Loading...'}
                </div>
            ))}
        </div>
    </div>
  )
}
