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
        // context.storeUser()
        let a = await context.storeUser()
        console.log(a);
        navigate('/karyawan')
    }
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
        </form>
    )
}

export default AddKaryawan