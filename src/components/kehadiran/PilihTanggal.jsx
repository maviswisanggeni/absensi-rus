import React, { useEffect, useRef, useState } from 'react'
import { Calendar } from 'react-calendar'
import calenderIcon from '../../assets/icons/kalender-card.svg'

function PilihTanggal(props) {
  const [open, setOpen] = useState(false)
  const [tanggal, setTanggal] = useState(new Date());
  const [text, setText] = useState(props.text)

  const drop = useRef(null);

  function handleClick(e) {
    if (!e.target.closest(`.${drop.current.className}`) && open) {
      setOpen(false);
    }
  }

  useEffect(() => {
      document.addEventListener("click", handleClick);
      return () => {
        document.removeEventListener("click", handleClick);
      };
  });

  function change(e){
    setTanggal(e)
    setText(e.toLocaleDateString())  
    console.log('text');
  }
  
  return (
    <div className='pilih-tanggal' ref={drop}>
      <div className='btn-pilih-tanggal' onClick={() => setOpen(open => !open)}>
        <img src={calenderIcon} alt=""/>
        <p>{text}</p>
      </div>
      {open && <Calendar onChange={change} value={tanggal}/>}
    </div>
  )
}

export default PilihTanggal