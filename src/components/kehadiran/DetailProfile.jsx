import React from 'react'
import people1 from '../../assets/images/Rectangle 35.jpg'

function DetailProfile() {
  return (
    <div className='detail-profile'>
        <div className='div-1'>
            <h1>Foto Profile</h1>
            <img src={people1} alt="" />
            <h3>Ayu Lestari</h3>
            <p>0123456789</p>
        </div>
        <div className='div-2'>
            <div className='info'>
                <h3>Jabatan</h3>
                <p>Guru Produktif PPLG</p>
            </div>
            <div className='info'>
                <h3>Nomer HP</h3>
                <p>0293-0293-3293</p>
            </div>
        </div>
        <div className='info'>
            <h3>Gender</h3>
            <p>Laki - laki</p>
        </div>
        <button>Kembali</button>
    </div>
  )
}

export default DetailProfile