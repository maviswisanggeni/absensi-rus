import React, { useState } from 'react'
import close from '../../assets/icons/close.svg'
import eye from '../../assets/icons/eye.svg'
import { useApiKaryawanStoreUser } from '../../contexts/api/karyawan/ContextApiKaryawanStoreUser'
import { useWrapperAddKaryawan } from '../../contexts/app/WrapperAddKaryawan'
import Input from './Input'
import Label from './Label'
import Select from './Select'


function Form() {
    const context = useApiKaryawanStoreUser()
    const [passwordShown, setPasswordShown] = useState(false);
    const [validatorNama, setValidatorNama] = useState(false)
    const contextValidator = useWrapperAddKaryawan()
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

    function ValidateEmail(mail) 
    {
     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
      {
        return (true)
      }
        return(false)
    }

    return (
        <div className='form'>
            <div className='nama'>
                <Label className='nama' label='Nama lengkap'/>
                <Input className='nama' type='text' placeholder='Masukkan nama karyawan' value={context.nama} func={context.setNama} setValidator={contextValidator.setValidatorNama}/>
                <p className='validator-text'>
                    { context.nama.length === 0 && contextValidator.validatorNama ? 'Isi nama' : ''}
                </p>
                <img src={close} onClick={handleDeleteInput}/>
            </div>

            <div className='niy'>
                <Label className='niy' label='NIY'/>
                <Input className='niy' type='number' placeholder='Masukkan Nomer Induk Yayasan' value={context.niy} func={context.setNiy} setValidator={contextValidator.setValidatorNIY}/>
                <p className='validator-text'>
                    { context.niy.length === 0  && contextValidator.validatorNIY ? 'Isi NIY' : ''}
                </p>
                <Input className='password' type={passwordShown ? 'text' : 'password'} placeholder='Password' value={context.password} func={context.setPassword} setValidator={contextValidator.setValidatorPwd}/>
                <img src={eye} onClick={handleUnhide} className='unhide'/>
                <p className='validator-text pwd'>
                    { context.password.length <= 5 && contextValidator.validatorPwd ? 'Password minimal 6 karakter' : ''}
                </p>
            </div>

            <div className='email'>
                <Label className='email' label='Email'/>
                <Input className='email' type='email' placeholder='Masukkan Email' value={context.email} func={context.setEmail} setValidator={contextValidator.setValidatorEmail}/>
                <p className='validator-text'>
                    { context.email.length === 0 && contextValidator.validatorEmail ? 'Isi email' : !ValidateEmail(context.email) && contextValidator.validatorEmail ? 'Email tidak valid' : ''}
                </p>
            </div>

            <div className='no-hp'>
                <Label className='no-hp' label='Nomer HP'/>
                <Input className='no-hp' type='number' placeholder='Masukkan Nomor HP' value={context.noHp} func={context.setnoHp} setValidator={contextValidator.setValidatorNoHP}/>
                <p className='validator-text'>
                    { context.noHp.length === 0 && contextValidator.validatorNoHP ? 'Isi Nomor HP' : context.noHp.length < 10 && contextValidator.validatorNoHP? 'Nomor tidak valid' : ''}
                </p>
            </div>

            <div className='jabatan-gender'>
                <div className='jabatan select'>
                    <Label className='jabatan' label='Jabatan'/>
                    <Select data={data} amountData={data.length + 1} func={context.setjenisUser}/>
                </div>
            </div>

            <div className='alamat'>
                <Label className='alamat' label='Alamat'/>
                <Input className='alamat' type='text' placeholder='Alamat Karyawan' value={context.alamat} func={context.setAlamat} setValidator={contextValidator.setValidatorAlamat}/>
                <p className='validator-text'>
                    { context.alamat.length === 0 && contextValidator.validatorAlamat ? 'Isi Alamat' : ''}
                </p>
            </div>
        </div>
    )
}

export default Form