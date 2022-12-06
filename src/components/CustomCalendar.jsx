import React, { useContext } from 'react'
import Calendar from 'react-calendar';
import { useState } from 'react';
import '../styles/css/App.css'
import { ContextApiKehadiranJmlKehadiran } from '../contexts/api/ContextApiKehadiran';

function CustomCalendar() {
  const [date, setDate, setLoading] = useContext(ContextApiKehadiranJmlKehadiran)

  const [value, setValue] = useState(new Date());

    function formatDate(dates) {
      var d = new Date(dates),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
    
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
    
      return [year, month, day].join('-');
    }

    // function changeDate(){
    //   // setDate(formatDate(value))
    //   setLoading(true)
    //   // console.log(date);
    // }

    const onChange = value =>  {
      setValue(value)
    }

  return (
    <div>
      <Calendar onChange={onChange}
      //  onClickDay={changeDate} 
      value={value} />
    </div>
  )
}

export default CustomCalendar