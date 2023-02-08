import axios from 'axios'
import React from 'react'
import { useState } from 'react';
import downloadLogo from '../../assets/icons/download.svg'

function ButtonDownload() {
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);

  async function download() {
    const url = "https://absensiguru.smkrus.com/api/dashboard/donload"
    setLoading(false);
    axios.get(
      url,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'responseType': 'blob'
        },
      }
    )
      .then((response) => {
        // create file link in browser's memory
        // const href = URL.createObjectURL(response.data);

        // // create "a" HTML element with href to file & click
        // const link = document.createElement('a');
        // link.href = href;
        // link.setAttribute('download', 'file.pdf'); //or any other extension
        // document.body.appendChild(link);
        // link.click();

        // // clean up "a" element & remove ObjectURL
        // document.body.removeChild(link);
        // URL.revokeObjectURL(href);
        setLoading(true);
        console.log(response);
      }).catch((error) => {
        console.log(error);
      })
  }

  return (
    <button
      // onClick={download}
      className='btn-download'>
      <img src={downloadLogo} alt="" />
      Download
    </button>
  )
}

export default ButtonDownload