import React, { useEffect, useRef, useState } from 'react'
import { Calendar } from 'react-calendar'
import calenderIcon from '../../assets/icons/kalender-card.svg'
import formatDate from '../useFormatCalendar';
import { useTanggalKehadiran } from '../../contexts/app/ContextTanggalKehadiran'
import { useApiKehadiranSearch } from '../../contexts/api/kehadiran/ContextApiKehadiranSearch';

function PilihTanggal(props) {
  const contextTanggal = useTanggalKehadiran()
  const contextSearch = useApiKehadiranSearch()
  const [open, setOpen] = useState(false)

  const drop = useRef(null);
  const inputRef = useRef();

  function handleClick(e) {
    if (!e.target.closest(`.${drop.current.className}`) && open) {
      setOpen(false);
    }
  }

  function change(e) {
    props.funcTanggal(e)
    props.funcTime(formatDate(e))
    props.funcText(formatDate(e))
    props?.setStartTime(formatDate(e))
    props?.setEndTime(formatDate(e))
  }

  useEffect(() => {
    contextSearch.setStartTime(contextTanggal.startTime)
    if(contextTanggal.endText !== 'Tanggal mulai'){
      contextSearch.setEndTime(contextTanggal.endTime)
    }
    // contextSearch.setEndTime(contextTanggal.endTime)
  }, [props.text])

  // make optional props for pilih tanggal  

  return (
    <div className='pilih-tanggal' ref={inputRef}>
      <div className='btn-pilih-tanggal' onClick={() => setOpen(open => !open)}>
        <img src={calenderIcon} alt="" />
        <p>{props.text}</p>
      </div>
      {open && <Calendar onChange={change} value={props.value} />}
    </div>
  )
}

PilihTanggal.defaultProps = {
  setStartTime: () => {},
  setEndTime: () => {},
}

export default PilihTanggal