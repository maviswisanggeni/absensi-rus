import axios from 'axios'
import React from 'react'
import { useState } from 'react';
import downloadLogo from '../../assets/icons/download.svg'

function ButtonDownload() {
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);

  function download() {
    window.location.replace('https://absensiguru.smkrus.com/api/dashboard/donload')
  }

  return (
    <button
      onClick={download}
      className='btn-download'>
      <img src={downloadLogo} alt="" />
      Download
    </button>
  )
}

export default ButtonDownload