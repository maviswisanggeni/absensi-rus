import React from 'react'
import Calendar from 'react-calendar';
import { useState } from 'react';
import '../styles/App.css'

function Calender() {
    const [value, onChange] = useState(new Date());
  return (
    <div>
      <Calendar onChange={onChange} value={value} />
    </div>
  )
}

export default Calender