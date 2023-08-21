import react, { createContext } from 'react'

const GlobalCalendar = createContext({
    monthIndex: 0,
    setMonthIndex: (index) => { },
    year: 0,
    setYear: (index) => { },
    smallCalendarMonth: 0,
    setSmallCalendarMonth: (index) => { },
    daySelected: null,
    setDaySelected: (day) => { },
    showEventModal: false,
    setShowEventModal: () => { },
    dispatchCalEvent: ({ type, payload }) => { },
    savedEvents: [],
    selectedEvent: null,
    setSelectedEvent: (evt) => { },
})

export default GlobalCalendar