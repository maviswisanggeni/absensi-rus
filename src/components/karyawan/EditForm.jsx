import React, { useState } from 'react'
import close from '../../assets/icons/close.svg'
import eye from '../../assets/icons/eye.svg'
import { useApiKaryawanUpdate } from '../../contexts/api/karyawan/ContextApiKaryawanEdit'
import Input from './Input'
import Label from './Label'

function EditForm({detailData}) {
    const context = useApiKaryawanUpdate()
    const [passwordShown, setPasswordShown] = useState(false);
    const [validatorNama, setValidatorNama] = useState(false)
    const [validatorPwd, setValidatorPwd] = useState(false)
    const [validatorEmail, setValidatorEmail] = useState(false)
    const [validatorNoHP, setValidatorNoHP] = useState(false)
    const [validatorAlamat, setValidatorAlamat] = useState(false)
    function handleChange(e){
        context.setAlamat(e.target.value)
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
                <Label className='nama' label='Nama lengkap' />
                <Input className='nama' type='text' placeholder='Masukkan nama karyawan' 
                value={context.nama}
                func={context.setNama}
                setValidator={setValidatorNama}
                />
                <p className='validator-text'>
                    { context.nama.length === 0 && validatorNama ? 'Isi nama' : ''}
                </p>                
                <img src={close} onClick={() => context.setNama('')}/>
            </div>

            <div className='niy'>
                <Label className='email' label='Email' />
                <Input className='email' type='email' placeholder='Masukkan Email' 
                value={context.email} 
                func={context.setEmail} 
                setValidator={setValidatorEmail}
                />
                <p className='validator-text'>
                    { context.email.length === 0 && validatorEmail ? 'Isi email' : !ValidateEmail(context.email) && validatorEmail ? 'Email tidak valid' : ''}
                </p>                
                <Input className='password' type={passwordShown ? 'text' : 'password'} placeholder='Password' 
                value='fkodskofksdof' 
                // func={context.setPassword} 
                // setValidator={setValidatorPwd}
                />
                {/* <p className='validator-text pwd'>
                    { context.password.length <= 6 && validatorPwd ? 'Password minimal 6 karakter' : ''}
                </p>                 */}
                <img src={eye} onClick={handleUnhide}/>
            </div>

            <div className='no-hp'>
                <Label className='no-hp' label='Nomer HP' />
                <Input className='no-hp' type='number' placeholder='Masukkan Nomer HP' 
                value={context.noHp} 
                func={context.setnoHp} 
                setValidator={setValidatorNoHP}
                />
                <p className='validator-text'>
                    { context.noHp.length === 0 && validatorNoHP ? 'Isi Nomor HP' : context.noHp.length < 10 && validatorNoHP? 'Nomor tidak valid' : ''}
                </p>                
            </div>

            <div className='alamat'>
                <Label className='alamat' label='Alamat' />
                <textarea placeholder='Alamat Karyawan' value={context.alamat} onChange={handleChange} cols="40" rows="5" onInput={() => setValidatorAlamat(true)}></textarea>
                <p className='validator-text'>
                    { context.alamat.length === 0 && validatorAlamat ? 'Isi Alamat' : ''}
                </p>                
            </div>
        </div>
    )
}

export default EditForm