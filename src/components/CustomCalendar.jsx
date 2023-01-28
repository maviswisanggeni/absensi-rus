import React from 'react'
import Calendar from 'react-calendar';
import { useState } from 'react';
import '../styles/css/App.css'
import formatDate from './useFormatCalendar';
import { useEffect } from 'react';

function CustomCalendar(props) {
  
  const [value, setValue] = useState(new Date());

    const onChange = value =>  {
      setValue(value)
    }

    useEffect(() => {
      props.func(formatDate(value))
    }, [value])

  return (
    <div>
      <Calendar onChange={onChange}
      value={value} />
    </div>
  )
}

export default CustomCalendar