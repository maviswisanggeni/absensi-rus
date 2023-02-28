import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CardJadwal from './CardJadwal'

function Jadwal() {
  const [data, setData] = useState(null)
  const token = localStorage.getItem("token");
  async function getJadwal() {
    axios.get("https://absensiguru.smkrus.com/api/dashboard/jadwal", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setData(res.data.data)
    }).catch((err) => {
      console.log(err)
    })
  }
  useEffect(() => {
    getJadwal()
  }, [])
  return (
    <div className='jadwal'>
        <h1>Jadwal</h1>
        {data?.map((item, key) => {
          return (
            <CardJadwal title={item.judul} date={item.tanggal} status={item.untuk} key={key}/>
          )
        })}  
    </div>
  )
}

export default Jadwal