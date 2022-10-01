import React from 'react'
import Calendar from 'react-calendar';
import { useState } from 'react';
import '../styles/css/App.css'

function CustomCalendar() {
    const [value, onChange] = useState(new Date());
  return (
    <div>
      <Calendar onChange={onChange} value={value} />
    </div>
  )
}

export default CustomCalendar