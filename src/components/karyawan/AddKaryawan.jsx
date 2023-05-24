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
import { resetForm } from '../../features/detailKaryawanSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getKategori } from '../../features/ketegoriSlice'
import { useState } from 'react'

function AddKaryawan() {
    const context = useApiKaryawanStoreUser()
    const contextValidator = useWrapperAddKaryawan()
    let navigate = useNavigate()
    const dispatch = useDispatch()
    const { errors } = useSelector((state) => state.detailKaryawanSlice)
    const [file, setFile] = useState({})
    const callback = payload => {
        setFile(payload)
    }

    useEffect(() => {
        dispatch(resetForm())
        dispatch(getKategori())
    }, [])

    async function addUser(e) {
        console.log('ini ke submit')
        e.preventDefault();
        context.setLoading(false)
        context.storeUser().then((res) => {
            if (res.status === 200) {
                context.setLoading(true)
                navigate('/karyawan')
            }
        })
            .catch((res) => {
                console.log(res);
                if (res.message === 'Request failed with status code 400') {
                    context.setLoading(true)
                    alert('Isi semua form')
                }
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
                        disabled={
                            Object.values(errors).some((error) => error === '') &&
                            Object.keys(file).length === 0
                        }
                        onClick={addUser} className='btn-submit'>Konfirmasi</button>
                </div>
                <div className='form-foto-profile'>
                    <Form />
                    <FotoProfile callback={callback} />
                </div>
                {!context.loading ? <div className='loading-fullscreen'><div className='loading'></div></div> : null}
            </div>
        </div>
    )
}

export default AddKaryawan