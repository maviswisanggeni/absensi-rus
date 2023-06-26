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

function DetailKaryawan() {
    let userId = useParams()
    const dispatch = useDispatch()
    const { nama, email, password, noHp, alamat, errors, listJadwal, listKtgkaryawan, isLoading, statusResApi, messageResApi, isDisplayMessage, loadingEdit
    } = useSelector((state) => state.karyawan)
    let navigate = useNavigate()

    const [file, setFile] = useState(null)
    const callback = payload => {
        setFile(payload)
    }

    useEffect(() => {
        dispatch(detailKaryawan(userId.id))
        dispatch(getKategori())
        dispatch(resetListKaryawan())
    }, [userId])

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
                navigate(-1)
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
                    <DetailForm />
                    <DetailFotoProfile callback={callback} />
                </div>
                {loadingEdit ? <div className='loading-fullscreen'><div className='loading'></div></div> : null}
            </form>
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