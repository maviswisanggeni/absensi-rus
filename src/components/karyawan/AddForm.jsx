import React, { useState } from 'react'
import close from '../../assets/icons/close.svg'
import eye from '../../assets/icons/eye.svg'
import { useApiKaryawanStoreUser } from '../../contexts/api/karyawan/ContextApiKaryawanStoreUser'
import Input from './Input'
import Label from './Label'
import Select from './Select'

function Form() {
    const context = useApiKaryawanStoreUser()
    const [passwordShown, setPasswordShown] = useState(false);

    let data = [
        {id: 1, nama: 'Pengajar'},
        {id: 2,nama: 'Staff'},
    ]

    function handleDeleteInput(){
        context.setNama('')
    }

    function handleUnhide(){
        setPasswordShown(passwordShown ? false : true);
    }

    return (
        <div className='form'>
            <div className='nama'>
                <Label className='nama' label='Nama lengkap'/>
                <Input className='nama' type='text' placeholder='Masukkan nama karyawan' value={context.nama} func={context.setNama}/>
                <img src={close} onClick={handleDeleteInput}/>
            </div>

            <div className='niy'>
                <Label className='niy' label='NIY'/>
                <Input className='niy' type='number' placeholder='Masukkan Nomer Induk Yayasan' value={context.niy} func={context.setNiy}/>
                <Input className='password' type={passwordShown ? 'text' : 'password'} placeholder='Password' value={context.password} func={context.setPassword}/>
                <img src={eye} onClick={handleUnhide} className='unhide'/>
            </div>

            <div className='email'>
                <Label className='email' label='Email'/>
                <Input className='email' type='email' placeholder='Masukkan Email' value={context.email} func={context.setEmail}/>
            </div>

            <div className='no-hp'>
                <Label className='no-hp' label='Nomer HP'/>
                <Input className='no-hp' type='number' placeholder='Masukkan Nomer HP' value={context.noHp} func={context.setnoHp}/>
            </div>

            <div className='jabatan-gender'>
                <div className='jabatan select'>
                    <Label className='jabatan' label='Jabatan'/>
                    <Select data={data} amountData={data.length + 1} func={context.setjenisUser}/>
                </div>
            </div>

            <div className='alamat'>
                <Label className='alamat' label='Alamat'/>
                <Input className='alamat' type='text' placeholder='Alamat Karyawan' value={context.alamat} func={context.setAlamat}/>
            </div>
        </div>
    )
}

export default Form