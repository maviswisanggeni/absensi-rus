import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import arrowLeft from '../../assets/icons/arrow-left.svg'
import Form from './AddForm'
import FotoProfile from './AddFotoProfile'
import { useApiKaryawanStoreUser } from '../../contexts/api/karyawan/ContextApiKaryawanStoreUser'
import '../../styles/css/add-karyawan.css'

function AddKaryawan() {
    const context = useApiKaryawanStoreUser()
    let navigate = useNavigate()
    async function addUser(e) {
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
            }
        })
    }
    console.log(context.loading);
    return (
        <form className='add-karyawan' onSubmit={addUser}>
            <div className='navigation'>
                <div>
                    <Link to={'/karyawan'}>
                        <img src={arrowLeft} alt="" />
                    </Link>
                    <h1>Tambah Karyawan</h1>
                </div>

                <input type="submit" value='Konfirmasi'/>
            </div>
            <div className='form-foto-profile'>
                <Form/>
                <FotoProfile/>
            </div>
            {!context.loading ? <div className='loading-fullscreen'><div className='loading'></div></div> : null}
        </form>
    )
}

export default AddKaryawan