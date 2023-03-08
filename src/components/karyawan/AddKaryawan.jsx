import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import arrowLeft from '../../assets/icons/arrow-left.svg'
import Form from './AddForm'
import FotoProfile from './AddFotoProfile'
import { useApiKaryawanStoreUser } from '../../contexts/api/karyawan/ContextApiKaryawanStoreUser'
import '../../styles/css/add-karyawan.css'
import { useWrapperAddKaryawan } from '../../contexts/app/WrapperAddKaryawan'

function AddKaryawan() {
    const context = useApiKaryawanStoreUser()
    const contextValidator = useWrapperAddKaryawan()
    let navigate = useNavigate()
    async function addUser(e) {
        console.log('ini ke submit')
        e.preventDefault();
        context.setLoading(false)
        context.storeUser().then((res) => {
            if(res.status === 200){
                context.setLoading(true)
                navigate('/karyawan')
            }
        })
        .catch((res) => {
            console.log(res);
            if(res.message === 'Request failed with status code 400'){
                context.setLoading(true)
                alert('Isi semua form')
            }
        })
    }
    return (
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
                    context.nama && context.niy && context.password && context.email 
                    && context.noHp && context.alamat &&
                    contextValidator.validatorNama && contextValidator.validatorNIY
                    && contextValidator.validatorPwd && contextValidator.validatorEmail
                    && contextValidator.validatorNoHP && contextValidator.validatorAlamat
                    && context.foto 
                    ? false : true
                }
                onClick={addUser} className='btn-submit'>Konfirmasi</button>
            </div>
            <div className='form-foto-profile'>
                <Form/>
                <FotoProfile/>
            </div>
            {!context.loading ? <div className='loading-fullscreen'><div className='loading'></div></div> : null}
        </div>
    )
}

export default AddKaryawan