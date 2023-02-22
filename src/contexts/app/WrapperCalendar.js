import dayjs from 'dayjs'
import React, { useEffect, useReducer, useState } from 'react'
import GlobalCalendar from './GlobalCalendar'

function savedEventsReducer(state, { type, payload }) {
    switch (type) {
        case 'push':
            return [...state, payload]
        case 'update':
            return state.map(evt => evt.id === payload.id ? payload : evt)
        case 'delete':
            return state.filter(evt => evt.id !== payload.id)
        default:
            return new Error('Invalid action type')
    }
}

function initEvents() {
    const storageEvents = localStorage.getItem('savedEvents')
    const parsedEvents = storageEvents ? JSON.parse(storageEvents) : []
    return parsedEvents
}

export default function WrapperCalendar(props) {
    const [monthIndex, setMonthIndex] = useState(dayjs().month())
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null)
    const [daySelected, setDaySelected] = useState(dayjs())
    const [showEventModal, setShowEventModal] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [savedEvents, dispatchCalEvent] = useReducer(savedEventsReducer, [], initEvents)

    useEffect(() => {
        localStorage.setItem('savedEvents', JSON.stringify(savedEvents))
    }, [savedEvents])

    useEffect(() => {
        if (smallCalendarMonth !== null) {
            setMonthIndex(smallCalendarMonth)
        }
    }, [monthIndex])

    return (
        <GlobalCalendar.Provider
            value={{
                monthIndex,
                setMonthIndex,
                smallCalendarMonth,
                setSmallCalendarMonth,
                daySelected,
                setDaySelected,
                showEventModal,
                setShowEventModal,
                dispatchCalEvent,
                selectedEvent,
                setSelectedEvent,
                savedEvents,
            }}>
            {props.children}
        </GlobalCalendar.Provider>
    )
}
