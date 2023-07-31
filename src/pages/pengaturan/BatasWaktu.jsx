import React, { useEffect, useRef, useState } from 'react'
import Button from '../../components/Button'
import { useDispatch, useSelector } from 'react-redux';
import { getBatasWaktu, updateBatasWaktu, updateInputPengaturan } from '../../features/pengaturanSlice';
import Skeleton from 'react-loading-skeleton';

function BatasWaktu() {
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch()
    const { batasWaktuMasuk, batasWaktuPulang, loadingKategori } = useSelector(state => state.pengaturan)
    const inputRef1 = useRef(null)
    const inputRef2 = useRef(null)
    const [rawWaktuMasuk, setRawWaktuMasuk] = useState('')
    const [rawWaktuPulang, setRawWaktuPulang] = useState('')
    const [showAlertMasuk, setShowAlertMasuk] = useState(false)
    const [showAlertPulang, setShowAlertPulang] = useState(false)

    useEffect(() => {
        dispatch(getBatasWaktu())
    }, [])

    function handleTimeChange(e) {
        if (e.target.value <= 720) {
            if (e.target.name === 'batasWaktuMasuk') {
                setShowAlertMasuk(false)
                setRawWaktuMasuk(e.target.value)
            } else {
                setShowAlertPulang(false)
                setRawWaktuPulang(e.target.value)
            }
        } else {
            if (e.target.name === 'batasWaktuMasuk') {
                setShowAlertMasuk(true)
            } else {
                setShowAlertPulang(true)
            }
        }
    }



    function handleEdit() {
        setIsEditing(!isEditing)
    }

    function handleBatal() {
        setIsEditing(false)
        dispatch(getBatasWaktu())
    }

    function formatMinutesToHIS(minutes) {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        const seconds = Math.floor((remainingMinutes - Math.floor(remainingMinutes)) * 60);

        const formattedTime = `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        return formattedTime;
    }

    function formatHISToMinutes(timeString) {
        const timeComponents = timeString.split(":");
        const hours = parseInt(timeComponents[0]);
        const minutes = parseInt(timeComponents[1]);
        const seconds = parseInt(timeComponents[2]);

        const totalMinutes = hours * 60 + minutes + seconds / 60;
        return totalMinutes;
    }

    useEffect(() => {
        setRawWaktuMasuk(formatHISToMinutes(batasWaktuMasuk))
        setRawWaktuPulang(formatHISToMinutes(batasWaktuPulang))
    }, [loadingKategori])

    function handleSimpan() {
        setIsEditing(false)
        dispatch(updateBatasWaktu({
            waktu_masuk: formatMinutesToHIS(rawWaktuMasuk),
            waktu_pulang: formatMinutesToHIS(rawWaktuPulang)
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
                    <label htmlFor="latitude">Batas waktu Masuk</label>
                    {loadingKategori
                        ? <Skeleton
                            width={187}
                            height={48}
                            borderRadius={5}
                        />
                        : <div>
                            <input
                                name='batasWaktuMasuk'
                                type="number"
                                value={rawWaktuMasuk}
                                onChange={handleTimeChange}
                                disabled={!isEditing}
                                ref={inputRef1}
                                max={720}
                            />
                            <p className='format'>Menit</p>
                        </div>
                    }

                    {showAlertMasuk
                        ? <p className='error__max'>Maksimal 720 menit</p>
                        : <p className='error__max'>*Sebelum waktu masuk</p>
                    }
                </div>
                <div className='container-input'>
                    <label htmlFor="longitude">Batas waktu Pulang</label>
                    {loadingKategori
                        ? <Skeleton
                            width={187}
                            height={48}
                            borderRadius={5}
                        />
                        : <div>
                            <input
                                name='batasWaktuPulang'
                                type="number"
                                value={rawWaktuPulang}
                                onChange={handleTimeChange}
                                disabled={!isEditing}
                                ref={inputRef2}
                            />
                            <p className='format'>Menit</p>
                        </div>
                    }
                    {showAlertPulang
                        ? <p className='error__max'>Maksimal 720 menit</p>
                        : <p className='error__max'>*Sebelum waktu pulang</p>
                    }
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