import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import arrowLeft from '../../assets/icons/arrow-left.svg'
import Form from './AddForm'
import FotoProfile from './AddFotoProfile'
import { useApiKaryawanStoreUser } from '../../contexts/api/karyawan/ContextApiKaryawanStoreUser'
import '../../styles/css/add-karyawan.css'
import { useWrapperAddKaryawan } from '../../contexts/app/WrapperAddKaryawan'
import Sidebar from '../sidebar/Sidebar'
import { useEffect } from 'react'
import { resetForm, listJadwalWeek, storeKaryawan } from '../../features/detailKaryawanSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getKategori } from '../../features/ketegoriSlice'
import { useState } from 'react'

function AddKaryawan() {
    const context = useApiKaryawanStoreUser()
    const contextValidator = useWrapperAddKaryawan()
    let navigate = useNavigate()
    const dispatch = useDispatch()
    const {
        nama, niy, email, password, noHp, alamat, errors, listJadwal, listKtgkaryawan, isLoading
    } = useSelector((state) => state.detailKaryawanSlice)
    const [file, setFile] = useState(null)
    const callback = payload => {
        setFile(payload)
    }

    useEffect(() => {
        dispatch(resetForm())
        dispatch(listJadwalWeek())
        dispatch(getKategori())
    }, [])

    async function addUser(e) {
        e.preventDefault();
        const filteredKategori = Object.values(listKtgkaryawan).map(item => item.id);
        const filteredListJadwal = listJadwal.filter((jadwal) => jadwal.jam_masuk !== '' && jadwal.jam_pulang !== '');
        dispatch(storeKaryawan({
            nama: nama,
            niy: niy,
            email: email,
            password: password,
            alamat: alamat,
            no_hp: noHp,
            pf_foto: file,
            jadwal: filteredListJadwal,
            ktg_karyawan: filteredKategori
        }))
            .then((res) => {
                if (res.meta.requestStatus === "fulfilled") {
                    navigate('/karyawan')
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <div className='wrapper-karyawan'>
            <Sidebar />
            <div className='add-karyawan'>
                <div className='navigation'>
                    <div>
                        <Link to={'/karyawan'}>
                            <img src={arrowLeft} alt="" />
                        </Link>
                        <h1>Tambah Karyawan</h1>
                    </div>

                    <button
                        disabled={false
                            // Object.values(errors).some((error) => error === '') &&
                            // Object.keys(file).length === 0
                        }
                        onClick={addUser} className='btn-submit'>Konfirmasi</button>
                </div>
                <div className='form-foto-profile'>
                    <Form />
                    <FotoProfile callback={callback} />
                </div>
                {isLoading ? <div className='loading-fullscreen'><div className='loading'></div></div> : null}
            </div>
        </div>
    )
}

export default AddKaryawan