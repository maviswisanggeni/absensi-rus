import React from 'react'
import { Link } from 'react-router-dom'
import { useKehadiranListAbsensi } from '../../contexts/api/ContextApiKehadiranListData'
import people1 from '../../assets/images/user-foto.png'

function DetailProfile() {
    const context = useKehadiranListAbsensi()
  return (
    <div className='detail-profile'>
        <div className='div-1'>
            <h1>Foto Profile</h1>
            <img src={people1} alt="" />
            <h3>{context.listAbsensi?.data?.data[0]?.karyawan?.niy}</h3>
            <p>{context.listAbsensi?.data?.data[0]?.karyawan?.nama}</p>
        </div>
        <div className='div-2'>
            <div className='info'>
                <h3>Jabatan</h3>
                <p>Guru Produktif PPLG</p>
            </div>
            <div className='info'>
                <h3>Nomer HP</h3>
                <p>{context.listAbsensi?.data?.data[0]?.karyawan?.no_hp}</p>
            </div>
        </div>
        <div className='info'>
            <h3>Gender</h3>
            <p>Laki - laki</p>
        </div>
        <Link to="/kehadiran">Kembali</Link>
    </div>
  )
}

export default DetailProfile