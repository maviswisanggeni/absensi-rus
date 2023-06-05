import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateFieldKalender } from '../../features/kalenderSlice'
import dayjs from 'dayjs'

function FormEvent() {
    const dispatch = useDispatch()
    const { judul, kategoriEvent, lokasi, waktuMulai, waktuSelesai, deskripsi, daySelected } = useSelector((state) => state.kalender)

    const formatTime = time => {
        const [hours, minutes] = time.split(':');
        const paddedHours = hours.padStart(2, '0'); // Add leading zero if necessary
        return `${paddedHours}:${minutes}`;
    };

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

    return (
        <div className='wrapper-form'>
            <h3>Detail Event</h3>
            <input type="text" placeholder='Nama Event' className='input input-nama-event' name='judul'
                value={judul}
                onChange={handleChange}
            />
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
            <input type="text" placeholder='Lokasi' className='input input-lokasi' name='lokasi'
                value={lokasi}
                onChange={handleChange}
            />
            <div className='wrapper-time'>
                <input type="text" placeholder={daySelected} className='input' disabled />
                <input type="time" className='input'
                    name='waktuMulai'
                    value={formatTime(waktuMulai.slice(-8))}
                    onChange={handleChange}
                />
                <div className='line'></div>
                <input type="time" className='input'
                    name='waktuSelesai'
                    value={formatTime(waktuSelesai.slice(-8))}
                    onChange={handleChange}
                />
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
        </div>
    )
}

export default FormEvent