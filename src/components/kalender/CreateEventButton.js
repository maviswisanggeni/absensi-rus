import React, { useContext } from 'react'
import GlobalCalendar from '../../contexts/app/GlobalCalendar'

export default function CreateEventButton() {
  const { setShowEventModal } = useContext(GlobalCalendar)
  return (
    <div onClick={() => setShowEventModal(true)} className='border p-2 rounded-full flex items-center shadow-md' style={{display: "flex",
    padding: "0.5rem",
    alignItems: "center",
    borderRadius: "9999px",
    borderWidth: "1px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    justifyContent: "center",
    }}>
        <p>+ Create</p>
    </div>
  )
}
