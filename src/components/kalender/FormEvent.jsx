import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showFormError, updateFieldError, updateFieldKalender, updateStateKalender } from '../../features/kalenderSlice'
import BtnCalendar from '../BtnCalendar'
import { useEffect } from 'react'
import { useState } from 'react'

function FormEvent() {
    const dispatch = useDispatch()
    const { judul, kategoriEvent, lokasi, deskripsi, errors, isFormEditted, peserta, loading, isAddPage,
        waktuMulaiLibur, waktuSelesaiLibur, jamMulai, jamSelesai, tanggalMulai, tanggalSelesai
    } = useSelector((state) => state.kalender)
    const [copyForm, setCopyForm] = useState({})

    function handleChange(e) {
        const { name, value } = e.target;
        if (name === 'jamMulai' || name === 'jamSelesai') {
            dispatch(updateFieldKalender({
                name,
                value: `${value}`
            }));
        } else {
            dispatch(updateFieldKalender({ name, value }));
        }

        if (value.trim() !== '') {
            dispatch(updateFieldError({
                field: name,
                value: ''
            }))
        }

        const preprocessString = (str) => str.replace(/\r/g, '');

        if ((preprocessString(copyForm[name]) !== value || preprocessString(copyForm[name]) !== preprocessString(value.trim())) && (name !== 'jamMulai' && name !== 'jamSelesai')) {
            dispatch(updateStateKalender({
                name: 'isFormEditted',
                value: true
            }))
        } else if ((name === 'jamMulai' || name === 'jamSelesai') && copyForm[name] !== value + ':00') {
            dispatch(updateStateKalender({
                name: 'isFormEditted',
                value: true
            }))
        } else {
            dispatch(updateStateKalender({
                name: 'isFormEditted',
                value: false
            }))
        }
    }

    useEffect(() => {
        if (isAddPage) {
            setCopyForm({
                judul: '',
                kategoriEvent: kategoriEvent,
                lokasi: '',
                deskripsi: '',
                waktuMulaiLibur: waktuMulaiLibur,
                waktuSelesaiLibur: waktuSelesaiLibur,
                jamMulai: '',
                jamSelesai: '',
                tanggalMulai: tanggalMulai,
                tanggalSelesai: tanggalSelesai,
                peserta: []
            });
        } else {
            setCopyForm({
                judul: judul,
                kategoriEvent: kategoriEvent,
                lokasi: lokasi,
                deskripsi: deskripsi,
                waktuMulaiLibur: waktuMulaiLibur,
                waktuSelesaiLibur: waktuSelesaiLibur,
                jamMulai: jamMulai,
                jamSelesai: jamSelesai,
                tanggalMulai: tanggalMulai,
                tanggalSelesai: tanggalSelesai,
                peserta: peserta
            })
        }
    }, [loading, isAddPage])

    function areObjectsEqual(obj1, obj2) {
        if (!obj1 && !obj2) {
            return true;
        }

        if (!obj1 || !obj2) {
            return false;
        }

        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        if (keys1.length !== keys2.length) {
            return false;
        }

        for (const key of keys1) {
            const val1 = obj1[key];
            const val2 = obj2[key];

            if (typeof val1 === 'object' && typeof val2 === 'object') {
                if (!areObjectsEqual(val1, val2)) {
                    return false;
                }
            } else if (val1 !== val2) {
                return false;
            }
        }

        return true;
    }

    function areArraysEqual(arr1, arr2) {
        if (arr1?.length !== arr2?.length) {
            return false;
        }

        for (let i = 0; i < arr1.length; i++) {
            const obj1 = arr1[i];
            const obj2 = arr2[i];

            if (!areObjectsEqual(obj1, obj2)) {
                return false;
            }
        }

        return true;
    }

    useEffect(() => {
        dispatch(updateStateKalender({
            name: 'isFormEditted',
            value: !areArraysEqual(copyForm.peserta, peserta)
        }))
    }, [peserta, copyForm.peserta, loading])

    return (
        <div className='wrapper-form'>
            <h3>Detail Event</h3>
            <input type="text" placeholder='Nama Event' className='input input-nama-event' name='judul'
                value={judul}
                onChange={handleChange}
            />
            <p className='validator-text'>
                {errors.judul && errors.judul}
            </p>
            <div className='checkbox-form'>
                <div className='wrap-label-radio'>
                    <input type='radio' id='event' className='input'
                        name='kategoriEvent'
                        value='event'
                        checked={kategoriEvent === 'event' ? true : false}
                        onChange={handleChange}
                    />
                    <label htmlFor='event'>Event</label>
                </div>

                <div className='wrap-label-radio'>
                    <input type='radio' id='libur' className='input'
                        name='kategoriEvent'
                        value='libur'
                        checked={kategoriEvent === 'libur' ? true : false}
                        onChange={handleChange}
                    />
                    <label htmlFor='libur'>Libur</label>
                </div>
            </div>
            {kategoriEvent === 'event' &&
                <>
                    <input type="text" placeholder='Lokasi' className='input input-lokasi' name='lokasi'
                        value={lokasi}
                        onChange={handleChange}
                    />
                    <p className='validator-text'>
                        {errors.lokasi && errors.lokasi}
                    </p>
                </>
            }

            <div className='wrapper-time'>
                <div className='time'>
                    {kategoriEvent === 'event' &&
                        <>
                            <BtnCalendar
                                value={tanggalMulai}
                                setState={updateStateKalender}
                                stateName={'tanggalMulai'}
                                setIsFormEditted={updateStateKalender}
                                copyForm={copyForm}
                            />

                            <BtnCalendar
                                value={tanggalSelesai}
                                setState={updateStateKalender}
                                stateName={'tanggalSelesai'}
                                setIsFormEditted={updateStateKalender}
                                copyForm={copyForm}
                            />

                            <input type="time" className='input'
                                name='jamMulai'
                                value={jamMulai.slice(0, 5)}
                                onChange={handleChange}
                            />
                            <div className='line'></div>
                            <input type="time" className='input'
                                name='jamSelesai'
                                value={jamSelesai.slice(0, 5)}
                                onChange={handleChange}
                            />
                        </>
                    }

                    {kategoriEvent === 'libur' &&
                        <>
                            <BtnCalendar
                                value={waktuMulaiLibur}
                                stateName='waktuMulaiLibur'
                                setState={updateStateKalender}
                            />

                            <div className='line'></div>

                            <BtnCalendar
                                value={waktuSelesaiLibur}
                                stateName='waktuSelesaiLibur'
                                setState={updateStateKalender}
                            />
                        </>
                    }
                </div>
                <p className='validator-text'>
                    {errors.jamMulai ? errors.jamMulai : errors.jamSelesai ? errors.jamSelesai : null}
                </p>
            </div>

            <textarea
                type='text'
                placeholder='Deskripsi Event'
                className='input input-deskripsi-event'
                onChange={handleChange}
                name='deskripsi'
                value={deskripsi}
            >
            </textarea>
            <p className='validator-text'>
                {errors.deskripsi && errors.deskripsi}
            </p>
        </div>
    )
}

export default FormEvent