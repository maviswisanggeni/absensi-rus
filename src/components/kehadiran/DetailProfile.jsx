import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import people1 from '../../assets/images/Rectangle 35.jpg'
import { ContextApiKehadiranList } from '../../contexts/api/ContextApiKehadiranListData'

function DetailProfile() {
    const params = useParams()
    const [listAbsensi] = useContext(ContextApiKehadiranList)
    
  return (
    <div className='detail-profile'>
        <div className='div-1'>
            <h1>Foto Profile</h1>
            <img src={people1} alt="" />
            <h3>{listAbsensi?.data?.data[0]?.karyawan?.niy}</h3>
            <p></p>
        </div>
        <div className='div-2'>
            <div className='info'>
                <h3>Jabatan</h3>
                <p>Guru Produktif PPLG</p>
            </div>
            <div className='info'>
                <h3>Nomer HP</h3>
                <p>{listAbsensi?.data?.data[0]?.karyawan?.no_hp}</p>
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