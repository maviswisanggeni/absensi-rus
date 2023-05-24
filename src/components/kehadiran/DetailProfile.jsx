import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import people1 from '../../assets/images/user-foto.png'

function DetailProfile({ data }) {
    const navigate = useNavigate()

    function checkNull(data) {
        return data === null ? '-' : data
    }

    function isImgUrl(url) {
        return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url)
    }

    return (
        <div className='detail-profile'>
            <div className='div-1'>
                <h1>Foto Profile</h1>
                <img src={isImgUrl(data?.user.link_foto) ? data.user?.link_foto : people1} alt="" />
                <h3>{checkNull(data?.user.nama)}</h3>
                <p>{checkNull(data?.user.niy)}</p>
            </div>
            <div className='div-2'>
                <div className='info'>
                    <h3>Jabatan</h3>
                    <p>{data?.user.ktgkaryawan.map(item => item.kategori)}</p>
                </div>
                <div className='info'>
                    <h3>Nomer HP</h3>
                    <p>{checkNull(data?.user.no_hp)}</p>
                </div>
            </div>
            <div className='back-btn' onClick={() => navigate(-1)}>Kembali</div>
        </div>
    )
}

export default DetailProfile