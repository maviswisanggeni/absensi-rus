import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showFormError, updateFieldError, updateFieldKalender, updateStateKalender } from '../../features/kalenderSlice'
import BtnCalendar from '../BtnCalendar'

function FormEvent() {
    const dispatch = useDispatch()
    const { judul, kategoriEvent, lokasi, deskripsi, daySelected, errors,
        waktuMulaiLibur, waktuSelesaiLibur, jamMulai, jamSelesai, tanggalMulai, tanggalSelesai
    } = useSelector((state) => state.kalender)

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
    }

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
                            />

                            <BtnCalendar
                                value={tanggalSelesai}
                                setState={updateStateKalender}
                                stateName={'tanggalSelesai'}
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