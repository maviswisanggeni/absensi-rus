import React, { useState } from 'react'
import close from '../../assets/icons/close.svg'
import eye from '../../assets/icons/eye.svg'
import { useApiKaryawanUpdate } from '../../contexts/api/karyawan/ContextApiKaryawanEdit'
import { useWrapperEditKaryawan } from '../../contexts/app/WrapperEditKaryawan'
import Input from './Input'
import Label from './Label'

function EditForm({detailData}) {
    const context = useApiKaryawanUpdate()
    const contextValidator = useWrapperEditKaryawan()
    const [passwordShown, setPasswordShown] = useState(false);

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
        contextValidator.setValidatorEmail(true)
        return (true)
      }
        contextValidator.setValidatorEmail(false)
        return(false)
    }

    function checkInputNull(input, setValidator){
        if(input.length === 0){
            setValidator(false)
            return false
        }else{
            // setValidator(true)
            return true
        }
    }

    function validateNoHp(){
        if(context.noHp.length < 10){
            // contextValidator.setValidatorNoHP(false)
            return false
        }else{
            // contextValidator.setValidatorNoHP(true)
            return true
        }
    }

    return (
        <div className='form'>
            <div className='nama'>
                <Label className='nama' label='Nama lengkap' />
                <Input className='nama' type='text' placeholder='Masukkan nama karyawan' 
                value={context.nama}
                func={context.setNama}
                />
                <p className='validator-text'>
                    { checkInputNull(context.nama, contextValidator.setValidatorNama) ? '' : 'Isi nama'}
                </p>                
                <img src={close} onClick={() => context.setNama('')}/>
            </div>

            <div className='niy'>
                <Label className='email' label='Email' />
                <Input className='email' type='email' placeholder='Masukkan Email' 
                value={context.email} 
                func={context.setEmail} 
                />
                <p className='validator-text'>
                    { !checkInputNull(context.email, contextValidator.setValidatorEmail)? 'Isi email' : !ValidateEmail(context.email) ? 'Email tidak valid' : ''}
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
                />
                <p className='validator-text'>
                    { !checkInputNull(context.noHp, contextValidator.setValidatorNoHP) ? 'Isi Nomor HP' : !validateNoHp() ? 'Nomor tidak valid' : ''}
                </p>                
            </div>

            <div className='alamat'>
                <Label className='alamat' label='Alamat' />
                <textarea placeholder='Alamat Karyawan' value={context.alamat} onChange={handleChange} cols="40" rows="5" ></textarea>
                <p className='validator-text'>
                    { !checkInputNull(context.alamat, contextValidator.setValidatorAlamat) ? 'Isi Alamat' : ''}
                </p>                
            </div>
        </div>
    )
}

export default EditForm