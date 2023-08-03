import React, { useEffect, useRef, useState } from 'react'
import { Calendar } from 'react-calendar'
import calenderIcon from '../../assets/icons/kalender-card.svg'
import formatDate from '../useFormatCalendar';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
function PilihTanggal({ setText, setTime, setDate, text, date, stateTime, stateText }) {
  const [open, setOpen] = useState(false)
  const calendarRef = useRef();
  const dispatch = useDispatch()

  function handleClick() {
    setOpen(!open);
  }

  function change(e) {
    setDate(e)
    dispatch(setText({ name: `${stateText}`, value: formatDate(e) }))
    dispatch(setTime({ name: `${stateTime}`, value: formatDate(e) }))
    dispatch(setTime(formatDate(e)))
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        calendarRef.current
        && !calendarRef.current.contains(event.target)
        && event.target.tagName !== "ABBR"
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className='pilih-tanggal' ref={calendarRef}>
      <div className='btn-pilih-tanggal' onClick={handleClick}>
        <img src={calenderIcon} alt="" />
        <div className='wrap-text'>
          <p>{dayjs(text).format('DD MMM YYYY') === 'Invalid Date' ? text : dayjs(text).format('DD MMM YYYY')}</p>
          {/* <p>{text}</p> */}
        </div>
      </div>
      {open &&
        <Calendar
          onChange={change}
          value={date}
        />
      }

    </div>
  )
}

PilihTanggal.defaultProps = {
  setStartTime: () => { },
  setEndTime: () => { },
}

export default PilihTanggal