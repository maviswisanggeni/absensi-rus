import React from 'react'
import CardJadwal from './CardJadwal'

function Jadwal() {
  return (
    <div className='jadwal'>
        <h1>Jadwal</h1>
        <CardJadwal title="Upacara Hari Pramuka" date="14 Agustus 2022" status="Semua siswa"/>
        <CardJadwal title="Classmeet" date="16 Agustus 2022" status="Semua guru dan siswa"/>
        <CardJadwal title="Classmeet" date="16 Agustus 2022" status="Semua guru dan siswa"/>
    </div>
  )
}

export default Jadwal