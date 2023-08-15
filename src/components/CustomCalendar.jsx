import React from 'react'
import { useState } from 'react';
import '../styles/css/App.css'
import formatDate from '../utils/formatDate';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Calendar } from 'react-calendar';

function CustomCalendar({ tanggal, setTanggal, setNonSerializableTanggal, stateName }) {

  const [value, setValue] = useState(new Date());
  const dispatch = useDispatch()

  const handleChange = value => {
    setValue(value)
    setTanggal(value)
    dispatch(
      setNonSerializableTanggal({
        name: stateName, value: formatDate(value)
      })
    )
  }

  useEffect(() => {
    setTanggal(value)
  }, [value])

  return (
    <Calendar onChange={handleChange} value={tanggal} />
  )
}

export default CustomCalendar