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
        <CardJadwal title="Upacara Hari Pramuka" date="14 Agustus 2022" status="Semua siswa"/>
        <CardJadwal title="Classmeet" date="16 Agustus 2022" status="Semua guru dan siswa"/>
        <CardJadwal title="Classmeet" date="16 Agustus 2022" status="Semua guru dan siswa"/>
    </div>
  )
}

export default Jadwal