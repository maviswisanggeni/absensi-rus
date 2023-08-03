import React, { useState } from 'react'
import close from '../../assets/icons/close.svg'
import eye from '../../assets/icons/eye.svg'
import { useApiKaryawanStoreUser } from '../../contexts/api/karyawan/ContextApiKaryawanStoreUser'
import { useWrapperAddKaryawan } from '../../contexts/app/WrapperAddKaryawan'
import Input from '../../components/karyawan/Input'
import Label from '../../components/karyawan/Label'
import Select from '../../components/karyawan/Select'
import { useDispatch, useSelector } from 'react-redux'
import { showFormError, updateFieldError, updateFieldValue } from '../../features/karyawanSlice'
import JabatanSelect from '../../components/karyawan/JabatanSelect'
import isValidEmail from '../../hooks/useIsValidateEmail'

function Form() {
    const dispatch = useDispatch()
    const { errors, nama, niy, password, email, noHp, alamat } = useSelector((state) => state.karyawan)

    const context = useApiKaryawanStoreUser()
    const [passwordShown, setPasswordShown] = useState(false);
    const contextValidator = useWrapperAddKaryawan()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateFieldValue({ field: name, value }));

        if (value.trim() !== '') {
            dispatch(updateFieldError({
                field: name,
                error: ''
            }))
        }

        dispatch(showFormError(name))
    };

    function handleDeleteInput() {
        dispatch(updateFieldValue({ field: 'nama', value: '' }));
    }

    function handleUnhide() {
        setPasswordShown(passwordShown ? false : true);
    }

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
                    {errors.nama && errors.nama}
                </p>
                <img src={close} onClick={handleDeleteInput} />
            </div>

            <div className='niy'>
                <Label className='niy' label='NIY' />
                <input
                    type="number"
                    name="niy"
                    value={niy}
                    placeholder='Masukkan Nomer Induk Yayasan'
                    id='niy'
                    onChange={handleInputChange}
                />
                <p className='validator-text'>
                    {errors.niy && errors.niy}
                </p>
                <input
                    type={passwordShown ? 'text' : 'password'}
                    name="password"
                    value={password}
                    placeholder='Password'
                    id='password'
                    onChange={handleInputChange}
                />
                <img src={eye} onClick={handleUnhide} className='unhide' />
                <p className='validator-text pwd'>
                    {errors.password && errors.password}
                </p>
            </div>

            <div className='email'>
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
                    {errors.email && errors.email}
                </p>
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
                    {errors.noHp && errors.noHp}
                </p>
            </div>

            <div className='jabatan-gender'>
                <Label className='no-hp' label='Jabatan' />
                <JabatanSelect />
                <p className='validator-text'>
                    {errors.listKtgkaryawan && errors.listKtgkaryawan}
                </p>
            </div>

            <div className='alamat'>
                <Label className='alamat' label='Alamat' />
                <input
                    className='alamat'
                    type='text'
                    name="alamat"
                    id='Alamat'
                    value={alamat}
                    placeholder='Alamat Karyawan'
                    onChange={handleInputChange}
                />
                <p className='validator-text'>
                    {errors.alamat && errors.alamat}
                </p>
            </div>
        </div>
    )
}

export default Form