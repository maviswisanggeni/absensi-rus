import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import arrowLeft from '../../assets/icons/arrow-left.svg'
import '../../styles/css/Karyawan.css'
import EditForm from './EditForm'
import DetailFotoProfile from './DetailFotoProfile'
import axios from 'axios'
import { useApiKaryawanUpdate } from '../../contexts/api/karyawan/ContextApiKaryawanEdit'
import { useWrapperEditKaryawan } from '../../contexts/app/WrapperEditKaryawan'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../sidebar/Sidebar'
import { detailKaryawan, updateKaryawan } from '../../features/detailKaryawanSlice'
import { getKategori } from '../../features/ketegoriSlice'

function DetailKaryawan() {
    let userId = useParams()
    const dispatch = useDispatch()
    const { nama, email, password, noHp, alamat, errors, listJadwal, listKtgkaryawan, isLoading } = useSelector((state) => state.detailKaryawanSlice)

    const [file, setFile] = useState(null)
    const callback = payload => {
        setFile(payload)
    }

    useEffect(() => {
        dispatch(detailKaryawan(userId.id))
        dispatch(getKategori())
    }, [userId])

    const [detail, setDetail] = useState([]);
    // const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");
    const context = useApiKaryawanUpdate()
    const contextValidator = useWrapperEditKaryawan()
    let navigate = useNavigate()

    useEffect(() => {
        async function getData() {
            const url = "https://absensiguru.smkrus.com/api/karyawan/edit/" + userId.id
            // setLoading(false);
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
                    // setLoading(true);
                }).catch((error) => {
                    console.log(error);
                })
        }
        // getData();
    }, [userId]);

    function updateUser(e) {
        e.preventDefault();
        const filteredKategori = Object.values(listKtgkaryawan).map(item => item.id);
        const filteredListJadwal = listJadwal.filter((jadwal) => jadwal.jam_masuk !== '' && jadwal.jam_pulang !== '');
        dispatch(updateKaryawan({
            id: userId.id,
            nama: nama,
            email: email,
            password, password,
            alamat: alamat,
            no_hp: noHp,
            pf_foto: file,
            jadwal: filteredListJadwal,
            ktg_karyawan: filteredKategori
        }))
            .then(() => {
                navigate('/karyawan')
            })
    }
    return (
        <div className='wrapper-karyawan'>
            <Sidebar />
            <form className='detail-karyawan' onSubmit={updateUser}>
                <div className='navigation'>
                    <div>
                        <img src={arrowLeft} alt="" onClick={() => navigate(-1)} />
                        <h1>Detail Karyawan</h1>
                    </div>

                    <input disabled={
                        errors.nama === "" &&
                            errors.email === "" &&
                            errors.password === "" &&
                            errors.noHp === "" &&
                            errors.alamat === ""
                            ? false : true
                    }
                        type="submit" value='Konfirmasi' className='btn-submit' />
                </div>
                <div className='detail-form'>
                    <EditForm />
                    <DetailFotoProfile callback={callback} />
                </div>
                {isLoading ? <div className='loading-fullscreen'><div className='loading'></div></div> : null}
            </form>
        </div>
    )
}

export default DetailKaryawan