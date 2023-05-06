import React from 'react'
import NavKalender from '../components/kalender/NavKalender'
import FormEvent from '../components/kalender/FormEvent'
import PartisipasiEvent from '../components/kalender/PartisipasiEvent'

function KalenderAdd() {
  return (
    <div className='wrapper-kalender-add'>
      <NavKalender />
      <div className='wrapper-content'>
        <FormEvent />
        <PartisipasiEvent/>
      </div>
    </div>
  )
}

export default KalenderAdd