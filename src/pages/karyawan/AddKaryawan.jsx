import React from 'react'
import { useNavigate } from 'react-router-dom'
import arrowLeft from '../../assets/icons/arrow-left.svg'
import Form from './AddForm'
import FotoProfile from './AddFotoProfile'
import '../../styles/css/add-karyawan.css'
import Sidebar from '../../components/sidebar/Sidebar'
import { useEffect } from 'react'
import { resetForm, listJadwalWeek, storeKaryawan, updateStateKaryawan } from '../../features/karyawanSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getKategori } from '../../features/ketegoriSlice'
import { useState } from 'react'
import InfoBox from '../../components/InfoBox'

function AddKaryawan() {
    let navigate = useNavigate()
    const dispatch = useDispatch()
    const {
        nama, niy, email, password, noHp, alamat, errors, listJadwal, listKtgkaryawan, isLoading, statusResApi, messageResApi, isDisplayMessage
    } = useSelector((state) => state.karyawan)
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
                    navigate(-1)
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function validateDisabled() {
        const hasNonEmptyJadwal = listJadwal.some((jadwal) => jadwal.jam_masuk !== '' && jadwal.jam_pulang !== '');
        if (
            errors.nama === "" &&
            errors.niy === "" &&
            errors.email === "" &&
            errors.password === "" &&
            errors.noHp === "" &&
            errors.alamat === "" &&
            listKtgkaryawan.length !== 0 &&
            hasNonEmptyJadwal
        ) {
            return false
        } else {
            return true
        }
    }

    return (
        <div className='wrapper-karyawan'>
            <Sidebar />
            <div className='add-karyawan'>
                {isDisplayMessage &&
                    <InfoBox
                        message={messageResApi}
                        status={statusResApi}
                        isDisplay={isDisplayMessage}
                        setIsDisplay={updateStateKaryawan}
                        stateName='isDisplayMessage'
                    />
                }
                <div className='navigation'>
                    <div>
                        <div className='wrapper-img' onClick={() => navigate(-1)}>
                            <img src={arrowLeft} alt="" />
                        </div>
                        <h1>Tambah Karyawan</h1>
                    </div>

                    <button
                        // disabled={validateDisabled()}
                        onClick={addUser}
                        className='btn-submit'
                    >
                        Konfirmasi
                    </button>
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