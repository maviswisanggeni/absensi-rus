import React from 'react'
import { Link } from 'react-router-dom'
import people1 from '../../assets/images/user-foto.png'

function DetailProfile(props) {
    function checkNull(data){
        return data === null ?  '-' : data
    }

    function isImgUrl(url) {
        return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url)
    }

    return (
        <div className='detail-profile'>
            <div className='div-1'>
                <h1>Foto Profile</h1>
                <img src={isImgUrl(props?.data?.absen.user?.pf_foto) ? props?.data?.absen.user?.pf_foto : people1} alt="" />
                <h3>{checkNull(props?.data?.absen.user?.nama)}</h3>
                <p>{checkNull(props?.data?.absen.user?.niy)}</p>
            </div>
            <div className='div-2'>
                <div className='info'>
                    <h3>Jabatan</h3>
                    <p>{checkNull(props?.data?.absen.user?.jabatan)}</p>
                </div>
                <div className='info'>
                    <h3>Nomer HP</h3>
                    <p>{checkNull(props?.data?.absen.user?.no_hp)}</p>
                </div>
            </div>
            <Link to="/kehadiran">Kembali</Link>
        </div>
    )
}

export default DetailProfile