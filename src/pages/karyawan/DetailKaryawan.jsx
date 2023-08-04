import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import arrowLeft from '../../assets/icons/arrow-left.svg'
import '../../styles/css/Karyawan.css'
import DetailForm from './DetailForm'
import DetailFotoProfile from './DetailFotoProfile'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../../components/sidebar/Sidebar'
import { detailKaryawan, resetListKaryawan, updateKaryawan, updateStateKaryawan } from '../../features/karyawanSlice'
import { getKategori } from '../../features/ketegoriSlice'
import InfoBox from '../../components/InfoBox'
import LoadingFullscreen from '../../components/LoadingFullscreen'

function DetailKaryawan() {
    let userId = useParams()
    const dispatch = useDispatch()
    const {
        nama, email, password, noHp, alamat, errors, listJadwal, listKtgkaryawan,
        statusResApi, messageResApi, isDisplayMessage, loadingEdit, isFormEditted
    } = useSelector((state) => state.karyawan)
    let navigate = useNavigate()
    const [showAlertBack, setShowAlertBack] = useState(false)
    const [showAlertUpdate, setShowAlertUpdate] = useState(false)

    const [file, setFile] = useState(null)
    const callback = payload => {
        setFile(payload)
    }

    useEffect(() => {
        dispatch(detailKaryawan(userId.id))
        dispatch(getKategori())
        dispatch(resetListKaryawan())
        dispatch(updateStateKaryawan({ name: 'isFormEditted', value: false }))
    }, [userId])

    function updateUser(e) {
        e.preventDefault();
        setShowAlertUpdate(true)
    }

    function handleApiUpdate() {
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
                navigate(-1)
            })
    }

    function handleBack() {
        if (isFormEditted) {
            setShowAlertBack(true)
        } else {
            navigate(-1)
        }
    }

    return (
        <div className='wrapper-karyawan'>
            <Sidebar />
            <div className='detail-karyawan'>
                <div className='navigation'>
                    <div>
                        <img src={arrowLeft} alt="" onClick={handleBack} />
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
                        type="button" value='Konfirmasi' className='btn-submit' onClick={updateUser} />
                </div>
                <div className='detail-form'>
                    <DetailForm />
                    <DetailFotoProfile callback={callback} />
                </div>
                <LoadingFullscreen loading={loadingEdit} />
            </div>

            {showAlertBack &&
                <div className='bg-modal'>
                    <div className='alert-modal'>
                        <h1>Edit Karyawan</h1>
                        <p>Ada perubahan yang belum Anda simpan, Anda yakin ingin membatalkan?</p>
                        <div>
                            <button onClick={() => setShowAlertBack(false)}>Tidak</button>
                            <button onClick={() => navigate(-1)}>Iya</button>
                        </div>
                    </div>
                </div>
            }

            {showAlertUpdate &&
                <div className='bg-modal'>
                    <div className='alert-modal'>
                        <h1>Edit Karyawan</h1>
                        <p>Kamu yakin edit karyawan ini?</p>
                        <div>
                            <button onClick={() => setShowAlertUpdate(false)}>Tidak</button>
                            <button onClick={handleApiUpdate}>Iya</button>
                        </div>
                    </div>
                </div>
            }

            <InfoBox
                message={messageResApi}
                status={statusResApi}
                isDisplay={isDisplayMessage}
                setIsDisplay={updateStateKaryawan}
                stateName='isDisplayMessage'
            />
        </div>
    )
}

export default DetailKaryawan