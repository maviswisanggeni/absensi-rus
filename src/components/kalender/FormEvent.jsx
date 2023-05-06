import React from 'react'

function FormEvent() {
    return (
        <div className='wrapper-form'>
            <h3>Detail Event</h3>
            <input type="text" placeholder='Nama Event' className='input input-nama-event' />
            <div className='checkbox-form'>
                <div className='wrap-label-radio'>
                    <input type='radio' id='Libur' value='0' name='isLibur' className='input' />
                    <label htmlFor='Libur'>Event</label>
                </div>

                <div className='wrap-label-radio'>
                    <input type='radio' id='Tidak Libur' value='1' name='isLibur' className='input' />
                    <label htmlFor='Tidak Libur'>Libur</label>
                </div>
            </div>
            <input type="text" placeholder='Lokasi' className='input input-lokasi' />
            <div className='wrapper-time'>
                <input type="text" placeholder='6 April 2023' className='input' disabled />
                <input type="time" className='input' />
                <div className='line'></div>
                <input type="time" className='input' />
            </div>

            <textarea
                type='text'
                placeholder='Deskripsi Event'
                className='input input-deskripsi-event'
            >
            </textarea>
        </div>
    )
}

export default FormEvent