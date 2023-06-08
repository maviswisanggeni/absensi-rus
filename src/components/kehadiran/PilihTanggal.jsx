import React, { useEffect, useRef, useState } from 'react'
import { Calendar } from 'react-calendar'
import calenderIcon from '../../assets/icons/kalender-card.svg'
import formatDate from '../useFormatCalendar';
import { useDispatch } from 'react-redux';
function PilihTanggal({ setText, setTime, setDate, text, date, stateTime, stateText }) {
  const [open, setOpen] = useState(false)
  const drop = useRef(null);
  const inputRef = useRef();
  const dispatch = useDispatch()

  function handleClick(e) {
    if (!e.target.closest(`.${drop.current.className}`) && open) {
      setOpen(false);
    }
  }

  function change(e) {
    setDate(e)
    dispatch(setText({ name: `${stateText}`, value: formatDate(e) }))
    dispatch(setTime({ name: `${stateTime}`, value: formatDate(e) }))
    dispatch(setTime(formatDate(e)))
  }

  return (
    <div className='pilih-tanggal' ref={inputRef}>
      <div className='btn-pilih-tanggal' onClick={() => setOpen(open => !open)}>
        <img src={calenderIcon} alt="" />
        <p>{text}</p>
      </div>
      {open && <Calendar onChange={change} value={date} />}
    </div>
  )
}

PilihTanggal.defaultProps = {
  setStartTime: () => { },
  setEndTime: () => { },
}

export default PilihTanggal