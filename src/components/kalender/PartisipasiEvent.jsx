import React from 'react'
import SearchDropdown from './SearchDropdown'
import Checkbox from './Checkbox'
import ListPartisipasi from './ListPartisipasi'

function PartisipasiEvent() {
  const checkboxOption = [
    { option: 'Semua Karyawan' },
    { option: 'Guru PPLG' },
    { option: 'Guru Animasi' },
    { option: 'Guru DKV' },
    { option: 'Staff' },
  ]
  return (
    <div className='wrapper-partisipasi'>
      <h3>Orang yang Berpartisipasi</h3>
      <SearchDropdown />
      <div className='wrapper-checkbox'>
        {
          checkboxOption.map((item, index) => (
            <div key={index} className='wrapper-checkbox-label'>
              <Checkbox control={item.option} />
              <label for={item.option}>{item.option}</label>
            </div>
          ))
        }
      </div>
      <div className='wrapper-top-list'>
        <div>
          <h4>Orang yang diundang</h4>
          <div className='count'>6</div>
        </div>
        <p>Reset</p>
      </div>
      <ListPartisipasi />
    </div>
  )
}

export default PartisipasiEvent