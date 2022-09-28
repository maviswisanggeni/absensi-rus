import React from 'react'
import ButtonDownload from './ButtonDownload'

function ChartInfo() {
  return (
    <div className='chartInfo'>
        <p>27 Oktober 2022 - 02 September 2022</p>
        <div className='role pengajar'>
            <div></div>
            <p>Pengajar</p>
        </div>
        <div className='role staff'>
            <div></div>
            <p>Staff</p>
        </div>
        <ButtonDownload/>
    </div>
  )
}

export default ChartInfo