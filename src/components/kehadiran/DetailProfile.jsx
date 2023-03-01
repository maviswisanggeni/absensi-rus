import React from 'react'
import { Link } from 'react-router-dom'
import people1 from '../../assets/images/user-foto.png'

function DetailProfile(props) {
    function checkNull(data){
        return data ? data : '-'
    }
    return (
        <div className='detail-profile'>
            <div className='div-1'>
                <h1>Foto Profile</h1>
                <img src={props?.data?.user?.pf_foto ? props?.data?.user?.pf_foto : people1} alt="" />
                <h3>{checkNull(props?.data?.user?.nama)}</h3>
                <p>{checkNull(props?.data?.user?.niy)}</p>
            </div>
            <div className='div-2'>
                <div className='info'>
                    <h3>Jabatan</h3>
                    <p>{checkNull(props?.data?.user?.jenis_user)}</p>
                </div>
                <div className='info'>
                    <h3>Nomer HP</h3>
                    <p>{checkNull(props?.data?.user?.no_hp)}</p>
                </div>
            </div>
            <Link to="/kehadiran">Kembali</Link>
        </div>
    )
}

export default DetailProfile