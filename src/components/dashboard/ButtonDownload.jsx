import React from 'react'
import downloadLogo from '../../assets/icons/download.svg'

function ButtonDownload() {
  return (
    <button className='btn-download'>
        <img src={downloadLogo} alt="" />
        Download
    </button>
  )
}

export default ButtonDownload