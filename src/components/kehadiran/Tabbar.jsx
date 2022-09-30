import React, { useState } from 'react'

function Tabbar() {
    const [current, setCurrent] = useState('Masuk')

    function handleClick(e){
        setCurrent(e.target.innerText)
    }

  return (
    <div className='tabbar'>
        <div className='tabbar-text'>
            <div onClick={handleClick} className={current === 'Masuk' ? 'active' : ''}>Masuk</div>
            <div onClick={handleClick} className={current === 'Keluar' ? 'active' : ''}>Keluar</div>
        </div>
        <div className={`line ${current === 'Masuk' ? '' : 'active'}`}></div>
    </div>
  )
}

export default Tabbar