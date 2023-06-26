import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateFieldKalender, updateStateKalender } from '../../features/kalenderSlice'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useRef } from 'react'
import { Calendar } from 'react-calendar'
import { useEffect } from 'react'

function FormEvent() {
    const dispatch = useDispatch()
    const { judul, kategoriEvent, lokasi, waktuMulai, waktuSelesai, deskripsi, daySelected, errors, waktuMulaiLibur, waktuSelesaiLibur
    } = useSelector((state) => state.kalender)
    const [isCalendarOpen1, setCalendarOpen1] = useState(false);
    const [isCalendarOpen2, setCalendarOpen2] = useState(false);
    const inputRef1 = useRef();
    const inputRef2 = useRef();

    useEffect(() => {
        dispatch(updateFieldKalender({
            name: 'waktuMulaiLibur',
            value: daySelected
        }))
        dispatch(updateFieldKalender({
            name: 'waktuSelesaiLibur',
            value: daySelected
        }))
    }, [])

    function handleChange(e) {
        const { name, value } = e.target;
        dispatch(updateFieldKalender({ name, value }));
        if (name === 'waktuMulai' || name === 'waktuSelesai') {
            dispatch(updateFieldKalender({
                name,
                value: `${dayjs(daySelected).format('YYYY-MM-DD')} ${value}:00`
            }));
        }
    }

    function handleChangeCalendar1(value) {
        dispatch(updateFieldKalender({
            name: 'waktuMulaiLibur',
            value: dayjs(value).format('DD MMMM YYYY')
        }));
    }

    function handleChangeCalendar2(value) {
        dispatch(updateFieldKalender({
            name: 'waktuSelesaiLibur',
            value: dayjs(value).format('DD MMMM YYYY')
        }));
    }

    const handleAddClick1 = () => {
        setCalendarOpen1(!isCalendarOpen1);
    };

    const handleAddClick2 = () => {
        setCalendarOpen2(!isCalendarOpen2);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                inputRef1.current
                && !inputRef1.current.contains(event.target)
                && !event.target.classList.contains('react-calendar__tile')
                && event.target.tagName !== "ABBR"
            ) {
                setCalendarOpen1(false);
            }
            if (
                inputRef2.current
                && !inputRef2.current.contains(event.target)
                && !event.target.classList.contains('react-calendar__tile')
                && event.target.tagName !== "ABBR"
            ) {
                setCalendarOpen2(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

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
                            <input
                                type="text"
                                placeholder={daySelected}
                                className='input'
                                disabled
                            />
                            <input type="time" className='input'
                                name='waktuMulai'
                                value={waktuMulai.slice(-8)}
                                onChange={handleChange}
                            />
                            <div className='line'></div>
                            <input type="time" className='input'
                                name='waktuSelesai'
                                value={waktuSelesai.slice(-8)}
                                onChange={handleChange}
                            />
                        </>
                    }

                    {kategoriEvent === 'libur' &&
                        <>
                            <div
                                className={`waktu waktu__mulai ${isCalendarOpen1 ? 'active' : null}`}
                                onClick={handleAddClick1}
                                ref={inputRef1}
                            >
                                {dayjs(waktuMulaiLibur).format('DD MMMM YYYY')}
                            </div>

                            {isCalendarOpen1 &&
                                <Calendar
                                    className='first-calendar'
                                    // inputRef={inputRef1}
                                    onChange={handleChangeCalendar1}
                                    value={new Date(waktuMulaiLibur)}
                                />
                            }

                            <div className='line'></div>

                            <div
                                className={`waktu waktu__selesai ${isCalendarOpen2 ? 'active' : null}`}
                                onClick={handleAddClick2}
                                ref={inputRef2}
                            >
                                {dayjs(waktuSelesaiLibur).format('DD MMMM YYYY')}
                            </div>

                            {isCalendarOpen2 &&
                                <Calendar
                                    className='second-calendar'
                                    // inputRef={inputRef2}
                                    onChange={handleChangeCalendar2}
                                    value={new Date(waktuSelesaiLibur)}
                                />
                            }
                        </>
                    }
                </div>
                <div className='wrapper-error'>
                    <p className='validator-text' style={{}}>
                        {errors.waktuMulai}
                    </p>
                    <p className='validator-text'>
                        {errors.waktuSelesai && errors.waktuSelesai}
                    </p>
                </div>
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