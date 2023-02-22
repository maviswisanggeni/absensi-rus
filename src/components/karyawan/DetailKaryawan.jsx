import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import arrowLeft from '../../assets/icons/arrow-left.svg'
import '../../styles/css/Karyawan.css'
import EditForm from './EditForm'
import DetailFotoProfile from './DetailFotoProfile'
import axios from 'axios'
import { useApiKaryawanUpdate } from '../../contexts/api/karyawan/ContextApiKaryawanEdit'

function DetailKaryawan() {
    let userId = useParams()
    const [detail, setDetail] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");  
    const context = useApiKaryawanUpdate()
    
        useEffect(() => {
        async function getData() {
            const url = "https://absensiguru.smkrus.com/api/karyawan/edit/" + userId.id
            setLoading(false);
            axios.get(
                url,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setDetail(response.data.user);
                    context.setNama(response.data.user.nama)
                    context.setEmail(response.data.user.email)
                    context.setAlamat(response.data.user.alamat)
                    context.setnoHp(response.data.user.no_hp)
                    context.setjenisUser(response.data.user.jenis_user)
                    setLoading(true);
                }).catch((error) => {
                    console.log(error);
                })
        }
        getData();
    }, [userId]);

    function updateUser(e) {
        e.preventDefault();
        context.updateUser()
    }

    return (
        <form className='detail-karyawan' onSubmit={updateUser}>
            <div className='navigation'>
                <div>
                    <Link to={'/karyawan'}>
                        <img src={arrowLeft} alt="" />
                    </Link>
                    <h1>Detail Karyawan</h1>
                </div>

                <input type="submit" value='Konfirmasi' />
            </div>
            <div className='detail-form'>
                <EditForm detailData={detail}/>
                <DetailFotoProfile detailData={detail}/>
            </div>
        </form>
    )
}

export default DetailKaryawan