import React, { useEffect, useRef, useState } from 'react'
import Button from '../../components/Button'
import { useDispatch, useSelector } from 'react-redux';
import { getBatasWaktu, updateBatasWaktu, updateInputPengaturan } from '../../features/pengaturanSlice';

function BatasWaktu() {
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch()
    const { batasWaktuMasuk, batasWaktuPulang } = useSelector(state => state.pengaturan)
    const inputRef1 = useRef(null)
    const inputRef2 = useRef(null)

    useEffect(() => {
        dispatch(getBatasWaktu())
    }, [])

    function handleTimeChange(e) {
        dispatch(updateInputPengaturan({
            name: e.target.name,
            value: e.target.value
        }))
    }

    function handleEdit() {
        setIsEditing(!isEditing)
    }

    function handleBatal() {
        setIsEditing(false)
        dispatch(getBatasWaktu())
    }


    function handleSimpan() {
        setIsEditing(false)
        dispatch(updateBatasWaktu({
            waktu_masuk: batasWaktuMasuk + ':00',
            waktu_pulang: batasWaktuPulang + ':00'
        }))
            .then((res) => {
                if (res.meta.requestStatus === "fulfilled") {
                    dispatch(getBatasWaktu())
                }
            })
    }

    return (
        <div className='batas-waktu'>
            <h1>Batas Waktu</h1>
            <div className='containers-input'>
                <div className='container-input'>
                    <label htmlFor="latitude">Absen Masuk</label>
                    <input
                        name='batasWaktuMasuk'
                        type="time"
                        value={batasWaktuMasuk}
                        onChange={handleTimeChange}
                        disabled={!isEditing}
                        ref={inputRef1}
                        onFocus={() => this.showPicker()}

                    />
                </div>
                <div className='container-input'>
                    <label htmlFor="longitude">Absen Pulang</label>
                    <input
                        name='batasWaktuPulang'
                        type="time"
                        value={batasWaktuPulang}
                        onChange={handleTimeChange}
                        disabled={!isEditing}
                        ref={inputRef2}
                    // onClick={() => datePic}
                    />
                </div>
            </div>
            <div className='wrapper-btn'>
                {!isEditing &&
                    <Button text={'Edit'} className={'edit-btn'} onClick={handleEdit} />
                }
                {isEditing &&
                    <>
                        <Button text={'Batal'} className={'batal-btn'} onClick={handleBatal} />
                        <Button text={'Simpan'} className={'simpan-btn'} onClick={handleSimpan} />
                    </>
                }
            </div>
        </div>
    )
}

export default BatasWaktu