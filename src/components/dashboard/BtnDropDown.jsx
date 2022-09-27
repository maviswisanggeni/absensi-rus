import React, { useEffect, useState } from 'react'
import Button from './Button';
import DropDownCard from './DropDownCard';

function BtnDropDown() {
    const sampleData = ['Minggu', 'Bulan'];
    const [open, setOpen] = useState(false);
    const drop = React.useRef(null);
    
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

  return (
    <div
        className="dropdown"
        ref={drop}>
        
        <Button onClick={() => setOpen(open => !open)} />
      {open && <DropDownCard data={sampleData} setOpen={setOpen} />}
      
    </div>
  )
}

export default BtnDropDown