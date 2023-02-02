import React, { useEffect, useRef, useState } from 'react'
import { Calendar } from 'react-calendar'
import calenderIcon from '../../assets/icons/kalender-card.svg'
import { useKehadiranListAbsensi } from '../../contexts/api/ContextApiKehadiranListData';
import formatDate from '../useFormatCalendar';
import { useTanggalKehadiran } from '../../contexts/app/ContextTanggalKehadiran'
import { useApiKehadiranSearch } from '../../contexts/api/ContextApiKehadiranSearch';

function PilihTanggal(props) {
  const contextList = useKehadiranListAbsensi()
  const contextTanggal = useTanggalKehadiran()
  const contextSearch = useApiKehadiranSearch()
  const [open, setOpen] = useState(false)

  const drop = useRef(null);
  const inputRef = useRef();

  function handleClick(e) {
    if (!e.target.closest(`.${drop.current.className}`) && open) {
      setOpen(false);
    }
    // if(inputRef.current && !inputRef.current.contains(e.target)){
    //   setOpen(false)
    // }
  }

  // useEffect(() => {
  //     document.addEventListener("click", handleClick);
  //     return () => {
  //       document.removeEventListener("click", handleClick);
  //     };
  // });

  function change(e){
    props.funcTanggal(e)
    props.funcTime(formatDate(e))
    props.funcText(formatDate(e))
  }
  
  useEffect(() => {
    contextList.setStartTime(contextTanggal.startTime)
    contextList.setEndTime(contextTanggal.endTime)
    contextSearch.setStartTime(contextTanggal.startTime)
    contextSearch.setEndTime(contextTanggal.endTime)
  }, [props.text])

  return (
    <div className='pilih-tanggal' ref={inputRef}>
      <div className='btn-pilih-tanggal' onClick={() => setOpen(open => !open)}>
        <img src={calenderIcon} alt=""/>
        <p>{props.text}</p>
      </div>
      {open && <Calendar onChange={change} value={props.value}/>}
    </div>
  )
}

export default PilihTanggal