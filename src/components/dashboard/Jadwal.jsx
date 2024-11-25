import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CardJadwal from './CardJadwal'
import dayjs from 'dayjs';
import Skeleton from 'react-loading-skeleton';
import apiUrl from '../../utils/apiUrl';

function Jadwal() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem("token");
  const url = apiUrl + '/api/dashboard/jadwal'
  function getJadwal() {
    setLoading(false)
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setData(res.data.data)
      setLoading(true)
    }).catch((err) => {
      setLoading(true)
    })
  }

  useEffect(() => {
    getJadwal()
  }, [])

  return (
    <div className='jadwal'>
      <h1>Event</h1>
      {!loading
        ? Array.from({ length: 3 }, (_, index) => (
          <Skeleton width={300} height={102} style={{ marginBottom: '1rem' }} key={index} />
        ))
        : data?.length === 0 ? <p>Tidak ada event hingga akhir bulan ini</p>
          : data?.map((item, key) => {
            return (
              <CardJadwal title={item.judul} date={dayjs(item.waktu_mulai).format('DD MMMM YYYY, HH:mm -') + dayjs(item.waktu_selesai).format(' HH:mm')} lokasi={item.lokasi} key={key} />
            )
          })}
    </div>
  )
}

export default Jadwal