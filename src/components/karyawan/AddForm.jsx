import React, { useState } from 'react'
import close from '../../assets/icons/close.svg'
import eye from '../../assets/icons/eye.svg'
import { useApiKaryawanStoreUser } from '../../contexts/api/karyawan/ContextApiKaryawanStoreUser'
import { useWrapperAddKaryawan } from '../../contexts/app/WrapperAddKaryawan'
import Input from './Input'
import Label from './Label'
import Select from './Select'
import { useDispatch, useSelector } from 'react-redux'
import { updateFieldError, updateFieldValue } from '../../features/detailKaryawanSlice'


function Form() {
    const dispatch = useDispatch()
    const { errors, nama, niy, password, email, noHp, alamat } = useSelector((state) => state.detailKaryawanSlice)
    const { listKategori } = useSelector((state) => state.kategori)

    const context = useApiKaryawanStoreUser()
    const [passwordShown, setPasswordShown] = useState(false);
    const [validatorNama, setValidatorNama] = useState(false)
    const contextValidator = useWrapperAddKaryawan()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateFieldValue({ field: name, value }));
    };

    const handleSelect = function (e) {
        const { value } = e.target;
        dispatch(updateFieldValue({ field: 'ktgKaryawan', value }));
    }

    function handleDeleteInput() {
        context.setNama('')
    }

    function handleUnhide() {
        setPasswordShown(passwordShown ? false : true);
    }

    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        return (false)
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
                {/* <Input className='niy' type='number' placeholder='Masukkan Nomer Induk Yayasan' value={context.niy} func={context.setNiy} setValidator={contextValidator.setValidatorNIY} /> */}
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
                {/* <Input className='password' type={passwordShown ? 'text' : 'password'} placeholder='Password' value={context.password} func={context.setPassword} setValidator={contextValidator.setValidatorPwd} /> */}
                <img src={eye} onClick={handleUnhide} className='unhide' />
                <p className='validator-text pwd'>
                    {/* {context.password.length <= 5 && contextValidator.validatorPwd ? 'Password minimal 6 karakter' : ''} */}
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
                {/* <Input className='email' type='email' placeholder='Masukkan Email' value={context.email} func={context.setEmail} setValidator={contextValidator.setValidatorEmail} /> */}
                <p className='validator-text'>
                    {errors.email && errors.email}
                    {/* {context.email.length === 0 && contextValidator.validatorEmail ? 'Isi email' : !ValidateEmail(context.email) && contextValidator.validatorEmail ? 'Email tidak valid' : ''} */}
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
                {/* <Input className='no-hp' type='number' placeholder='Masukkan Nomor HP' value={context.noHp} func={context.setnoHp} setValidator={contextValidator.setValidatorNoHP} /> */}
                <p className='validator-text'>
                    {errors.noHp && errors.noHp}
                    {/* {context.noHp.length === 0 && contextValidator.validatorNoHP ? 'Isi Nomor HP' : context.noHp.length < 10 && contextValidator.validatorNoHP ? 'Nomor tidak valid' : ''} */}
                </p>
            </div>

            <div className='jabatan-gender'>
                <div className='jabatan select'>
                    <select onChange={handleSelect} value={listKategori[0]?.kategori}>
                        {listKategori.map((item, key) => {
                            return (
                                <option key={key} value={item.kategori}>{item.kategori}</option>
                            )
                        })}
                    </select>
                </div>
            </div>

            <div className='alamat'>
                <Label className='alamat' label='Alamat' />
                {/* <Input className='alamat' type='text' placeholder='Alamat Karyawan' value={context.alamat} func={context.setAlamat} setValidator={contextValidator.setValidatorAlamat} /> */}
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
                    {context.alamat.length === 0 && contextValidator.validatorAlamat ? 'Isi Alamat' : ''}
                    {errors.alamat && errors.alamat}
                </p>
            </div>
        </div>
    )
}

export default Form