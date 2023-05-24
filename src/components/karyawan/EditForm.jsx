import React, { useState } from 'react'
import close from '../../assets/icons/close.svg'
import eye from '../../assets/icons/eye.svg'
import at from '../../assets/icons/at.svg'
import Label from './Label'
import { useDispatch, useSelector } from 'react-redux'
import { resetField, updateFieldError, updateFieldValue } from '../../features/detailKaryawanSlice'

function EditForm() {
    const dispatch = useDispatch()
    const { nama, email, password, noHp, alamat, errors } = useSelector(
        (state) => state.detailKaryawanSlice
    );

    const [passwordShown, setPasswordShown] = useState(false);

    function handleUnhide() {
        setPasswordShown(passwordShown ? false : true);
    }

    const validateNama = (value) => {
        if (value?.length < 1) {
            return 'Isi nama';
        }
        return '';
    };

    const validatePwd = (value) => {
        if (value.length < 8) {
            return 'Isi password minimal 8 karakter';
        }
        return '';
    };

    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return ''
        }
        return 'Email tidak valid'
    }

    function validateNoHp(value) {
        if (value?.length < 10) {
            return 'Nomor tidak valid'
        }
        return ''
    }

    const validateAlamat = (value) => {
        if (value?.length < 1) {
            return 'Isi Alamat';
        }
        return '';
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateFieldValue({ field: name, value }));
        let error = '';
        switch (name) {
            case 'nama':
                error = validateNama(value);
                break;
            case 'email':
                error = ValidateEmail(value);
                break;
            case 'password':
                error = validatePwd(value);
                break;
            case 'noHp':
                error = validateNoHp(value);
                break;
            case 'alamat':
                error = validateAlamat(value);
                break;
            default:
                break;
        }
        dispatch(updateFieldError({ field: name, error }));
    };

    const handleResetField = (field) => {
        dispatch(resetField(field));
    };

    return (
        <div className='form'>
            <div className='nama'>
                <Label className='nama' label='Nama lengkap' />
                <input
                    type="text"
                    name="nama"
                    value={nama}
                    placeholder='Masukkan nama karyawan'
                    id='nama'
                    onChange={handleInputChange}
                />
                <p className='validator-text'>
                    {errors.nama}
                </p>
                <img src={close} className='at-icon' onClick={() => handleResetField('nama')} />
            </div>

            <div className='niy'>
                <Label className='email' label='Email' />
                <input
                    type="email"
                    name="email"
                    id='email'
                    value={email}
                    placeholder='Masukkan Email'
                    onChange={handleInputChange}
                />
                <p className='validator-text'>
                    {errors.email}
                </p>
                <img src={at} className='at-icon' />

                <input
                    type={passwordShown ? 'text' : 'password'}
                    name="password"
                    id='password'
                    value={password}
                    placeholder='Password'
                    onChange={handleInputChange}
                />
                <p className='validator-text pwd'>
                    {errors.password}
                </p>
                <img src={eye} className='pwd-icon' onClick={handleUnhide} />
            </div>

            <div className='no-hp'>
                <Label className='no-hp' label='Nomer HP' />
                <input
                    type='number'
                    name="noHp"
                    id='Nomer HP'
                    value={noHp}
                    placeholder='Masukkan Nomer HP'
                    onChange={handleInputChange}
                />
                <p className='validator-text'>
                    {errors.noHp}
                </p>
            </div>

            <div className='alamat'>
                <Label className='alamat' label='Alamat' />
                <textarea
                    placeholder='Alamat Karyawan'
                    name='alamat'
                    id='Alamat'
                    value={alamat}
                    onChange={handleInputChange}
                    cols="40" rows="5"
                >
                </textarea>
                <p className='validator-text'>
                    {errors.alamat}
                </p>
            </div>
        </div>
    )
}

export default EditForm