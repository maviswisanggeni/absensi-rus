import React from 'react'
import arrowLeft from '../../assets/icons/arrow-left.svg'
import MasukKeluar from './MasukKeluar'
import people1 from '../../assets/images/Rectangle 35.jpg'
import people2 from '../../assets/images/Rectangle 39.jpg'
import DetailProfile from './DetailProfile'
import { Link } from 'react-router-dom'

function Detail() { 
    
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
                <MasukKeluar keterangan="Masuk" img={people1}/>
                <MasukKeluar keterangan="Keluar" img={people2}/>
            </div>
            <DetailProfile/>
        </div>
    </div>
  )
}

export default Detail