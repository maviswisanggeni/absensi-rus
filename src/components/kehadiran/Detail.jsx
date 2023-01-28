import React from 'react'
import arrowLeft from '../../assets/icons/arrow-left.svg'
import MasukKeluar from './MasukKeluar'
import people1 from '../../assets/images/Rectangle 35.jpg'
import people2 from '../../assets/images/Rectangle 39.jpg'
import DetailProfile from './DetailProfile'
import { Link } from 'react-router-dom'
import { useKehadiranListAbsensi } from '../../contexts/api/ContextApiKehadiranListData'

function Detail() { 
    const context = useKehadiranListAbsensi()
  return (
    <div className='detail'>
        <div className='navigation'>
            <Link to={'/kehadiran'}>
                <img src={arrowLeft} alt=""/>
            </Link>
            <h1>Detail User</h1>
        </div>
        <div className='main'>
            <div className='detail-masuk-keluar'>
                <MasukKeluar id={context.listAbsensi?.data?.data[0]?.id} keterangan="Masuk" img={people1}/>
                <MasukKeluar id={context.listAbsensi?.data?.data[0]?.id} keterangan="Keluar" img={people2}/>
            </div>
            <DetailProfile/>
        </div>
    </div>
  )
}

export default Detail