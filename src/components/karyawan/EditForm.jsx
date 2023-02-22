import React from 'react'
import close from '../../assets/icons/close.svg'
import eye from '../../assets/icons/eye.svg'
import { useApiKaryawanUpdate } from '../../contexts/api/karyawan/ContextApiKaryawanEdit'
import Input from './Input'
import Label from './Label'

function EditForm({detailData}) {
    const context = useApiKaryawanUpdate()

    function handleChange(e){
        context.setAlamat(e.target.value)
    }

    return (
        <div className='form'>
            <div className='nama'>
                <Label className='nama' label='Nama lengkap' />
                <Input className='nama' type='text' placeholder='Masukkan nama karyawan' 
                value={context.nama}
                func={context.setNama}
                />
                <img src={close} />
            </div>

            <div className='niy'>
                <Label className='email' label='Email' />
                <Input className='email' type='email' placeholder='Masukkan Email' 
                value={context.email} 
                func={context.setEmail} 
                />
                <Input className='password' type='password' placeholder='Password' 
                value='fkodskofksdof' 
                // func={context.setPassword} 
                />
                <img src={eye} />
            </div>

            <div className='no-hp'>
                <Label className='no-hp' label='Nomer HP' />
                <Input className='no-hp' type='number' placeholder='Masukkan Nomer HP' 
                value={context.noHp} 
                func={context.setnoHp} 
                />
            </div>

            <div className='alamat'>
                <Label className='alamat' label='Alamat' />
                <textarea placeholder='Alamat Karyawan' value={context.alamat} onChange={handleChange} cols="40" rows="5"></textarea>
            </div>
        </div>
    )
}

export default EditForm