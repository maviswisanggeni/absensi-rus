import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CardJadwal from './CardJadwal'
import dayjs from 'dayjs';

function Jadwal() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem("token");
  function getJadwal() {
    setLoading(false)
    axios.get("https://absensiguru.smkrus.com/api/dashboard/jadwal", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setData(res.data.data)
      setLoading(true)
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
      {!loading ? <div className='loading'></div> :
        data?.length === 0 ? <p>Tidak ada jadwal hari ini</p> :
          data?.map((item, key) => {
            return (
              <CardJadwal title={item.judul} date={dayjs(item.waktu_mulai).format('DD MMMM YYYY')} lokasi={item.lokasi} key={key} />
            )
          })}
    </div>
  )
}

export default Jadwal