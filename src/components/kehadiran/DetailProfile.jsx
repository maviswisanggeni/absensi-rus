import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import people1 from '../../assets/images/user-foto.png'
import useImgError from '../../utils/imgErrorValidation'
import { goBack } from '../../utils/goBack'

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
                <img src={data?.user?.link_foto} onError={useImgError} alt="" />
                <h3>{checkNull(data?.user?.nama)}</h3>
                <p>{checkNull(data?.user?.niy)}</p>
            </div>
            <div className='div-2'>
                <div className='info'>
                    <h3>Jabatan</h3>
                    <p>
                        {data?.user?.ktgkaryawan.map((itemKategori, index) => (
                            <React.Fragment key={itemKategori.id}>
                                {itemKategori.kategori}
                                {index !== data?.user?.ktgkaryawan?.length - 1 && ','}{' '}
                            </React.Fragment>
                        ))}
                    </p>
                </div>
                <div className='info'>
                    <h3>Nomer HP</h3>
                    <p>{checkNull(data?.user?.no_hp)}</p>
                </div>
                <div className='info'>
                    <h3>Email</h3>
                    <p>{data?.user?.email}</p>
                </div>
            </div>
            <div className='back-btn' onClick={goBack}>Kembali</div>
        </div>
    )
}

export default DetailProfile