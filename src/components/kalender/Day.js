import React, { useContext, useEffect, useState } from 'react'
import dayjs from "dayjs";
import GlobalCalendar from '../../contexts/app/GlobalCalendar';

export default function Day({ day, rowIdx }) {

    const [dayEvents, setDayEvents] = useState([])
    const {setDaySelected, setShowEventModal, savedEvents, setSelectedEvent, selectedEvent} = useContext(GlobalCalendar)
    
    useEffect(() => {
        const events = savedEvents.filter(evt => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY"))
        setDayEvents(events)
    }, [savedEvents, day])

    console.log(selectedEvent);

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
        <div style={{flex: "1 1 0%"}} onClick={() => {
            setDaySelected(day)
            setShowEventModal(true)
            // setSelectedEvent(selectedEvent ? null : selectedEvent)
        }}>
            {dayEvents.map((evt, idx) => (
                <div key={idx} style={{backgroundColor: evt.label}} onClick={() => setSelectedEvent(evt)}>
                    {evt.title}
                </div>
            ))}
        </div>
    </div>
  )
}
