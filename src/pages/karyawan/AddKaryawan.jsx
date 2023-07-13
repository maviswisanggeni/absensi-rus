import React from 'react'
import { useNavigate } from 'react-router-dom'
import arrowLeft from '../../assets/icons/arrow-left.svg'
import Form from './AddForm'
import FotoProfile from './AddFotoProfile'
import '../../styles/css/add-karyawan.css'
import Sidebar from '../../components/sidebar/Sidebar'
import { useEffect } from 'react'
import { resetForm, showFormError, storeKaryawan, updateStateKaryawan } from '../../features/karyawanSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getKategori } from '../../features/ketegoriSlice'
import { useState } from 'react'
import InfoBox from '../../components/InfoBox'
import LoadingFullscreen from '../../components/LoadingFullscreen'

function AddKaryawan() {
    let navigate = useNavigate()
    const dispatch = useDispatch()
    const {
        nama, niy, email, password, noHp, alamat, errors, listJadwal, listKtgkaryawan, loadingStore,
        statusResApi, messageResApi, isDisplayMessage, isFormValid
    } = useSelector((state) => state.karyawan)
    const { loadingKategori } = useSelector((state) => state.kategori)
    const [file, setFile] = useState({})
    const [isFileLoad, setIsFileLoad] = useState(false)

    const callbackFile = payload => {
        setFile(payload)
    }

    const callbackIsLoad = payload => {
        setIsFileLoad(payload)
    }

    useEffect(() => {
        dispatch(resetForm())
        dispatch(getKategori())
    }, [])

    async function addUser(e) {
        e.preventDefault();
        dispatch(showFormError())


        if (isFormValid) {
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
            hasNonEmptyJadwal &&
            isFileLoad
        ) {
            return false
        } else {
            return true
        }
    }

    useEffect(() => {
        dispatch(updateStateKaryawan({ name: 'isFormValid', value: !validateDisabled() }))
        console.log(!validateDisabled());
    }, [errors, validateDisabled(), file])

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
                        onClick={addUser}
                        className='btn-submit'
                    >
                        Konfirmasi
                    </button>
                </div>
                <div className='form-foto-profile'>
                    <Form />
                    <FotoProfile callbackFile={callbackFile} callbackIsLoad={callbackIsLoad} />
                </div>
                <LoadingFullscreen loading={loadingStore} />
            </div>
        </div>
    )
}

export default AddKaryawan