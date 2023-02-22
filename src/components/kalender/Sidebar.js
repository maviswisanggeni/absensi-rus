import React, { useContext } from 'react'
import GlobalCalendar from '../../contexts/app/GlobalCalendar'
import CreateEventButton from './CreateEventButton'
import SmallCalendar from './SmallCalendar'

export default function Sidebar() {
  return (
    <aside style={{padding: "1.25rem",width: "16rem",borderWidth: "1px",}}>
        <CreateEventButton/>
        <SmallCalendar/>
    </aside>
  )
}
