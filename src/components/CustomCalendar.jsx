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
      props.tanggal(value.getDate())
      props.bulan(value.getMonth() + 1)
      props.tahun(value.getFullYear())
    }, [value])

  return (
    <div>
      <Calendar onChange={onChange}
      value={value} />
    </div>
  )
}

CustomCalendar.defaultProps = {
  func: () => {},
  tanggal: () => {},
  bulan: () => {},
  tahun: () => {}
}

export default CustomCalendar