import React, { useEffect, useRef, useState } from 'react'
import { useApiKaryawanUpdate } from '../../contexts/api/karyawan/ContextApiKaryawanEdit'
import Label from '../../components/karyawan/Label'
import Select from '../../components/karyawan/Select'
import imgIcon from '../../assets/icons/img-icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { listJadwalWeek, updateFieldValue } from '../../features/karyawanSlice'
import JabatanSelect from '../../components/karyawan/JabatanSelect'

function DetailFotoProfile({ callback }) {
    const dispatch = useDispatch()
    const context = useApiKaryawanUpdate()
    const [image, setImage] = useState(null)
    const [file, setFile] = useState(null)
    const [weekListJadwal, setWeekListJadwal] = useState([])
    const { nama, niy, linkFoto, listKtgkaryawan, ktgKaryawan, listJadwal } = useSelector(
        (state) => state.karyawan
    );

    const inputRef = useRef(null)

    const handleChange = function (e) {
        console.log(e.target.files[0]);
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
            setFile(e.target.files[0])
            context.setFoto(e.target?.files[0])
        }
    };

    useEffect(() => {
        callback(file)
    }, [file])

    const formatTime = time => {
        const [hours, minutes] = time?.split(':');
        const paddedHours = hours.padStart(2, '0'); // Add leading zero if necessary
        return `${paddedHours}:${minutes}`;
    };

    const handleTimeChange = (e, index, property) => {
        const { value } = e.target;

        // Create a copy of the listJadwal array
        const updatedListJadwal = [...weekListJadwal];

        // Create a copy of the specific item in the listJadwal array
        const updatedItem = { ...updatedListJadwal[index] };

        // Update the specific property in the copied item
        updatedItem[property] = formatTime(value); // Format the time value

        // Update the specific item in the copied listJadwal array
        updatedListJadwal[index] = updatedItem;

        // Dispatch the updateFieldValue action with the updated listJadwal
        dispatch(updateFieldValue({ field: 'listJadwal', value: updatedListJadwal }));
    };

    useEffect(() => {
        let listJadwalWeek = [
            {
                hari: 'senin',
                jam_masuk: '',
                jam_pulang: ''
            },
            {
                hari: 'selasa',
                jam_masuk: '',
                jam_pulang: ''
            },
            {
                hari: 'rabu',
                jam_masuk: '',
                jam_pulang: ''
            },
            {
                hari: 'kamis',
                jam_masuk: '',
                jam_pulang: ''
            },
            {
                hari: 'jumat',
                jam_masuk: '',
                jam_pulang: ''
            },
            {
                hari: 'sabtu',
                jam_masuk: '',
                jam_pulang: ''
            },
            {
                hari: 'minggu',
                jam_masuk: '',
                jam_pulang: ''
            }
        ];
        var res = listJadwalWeek.map(obj => listJadwal.find(o => o.hari.toLowerCase() === obj.hari.toLowerCase()) || obj);
        setWeekListJadwal(res)
    }, [listJadwal])

    return (
        <div className='detail-profile'>
            <div className='div-1'>
                <h1>Foto Profile</h1>
                <div className='wrapper-img'>
                    <img src={
                        image ? image : linkFoto
                    } alt="" />
                    <div className='edit-img'>
                        <input type="file" ref={inputRef} onChange={handleChange} />
                        <img src={imgIcon} onClick={() => inputRef.current.click()} />
                    </div>
                </div>
                <h3>{nama}</h3>
                <p>{niy}</p>
            </div>
            <div className='wrapper-jabatan'>
                <div className='select'>
                    <h1 className='select-heading'>Jabatan</h1>
                    <h3>{listKtgkaryawan.length < 1 ? 'Karyawan tidak punya kategori' : null}</h3>
                    <JabatanSelect />
                </div>
                <div className='jadwal-absensi'>
                    <h1>Jadwal Absensi</h1>
                    {weekListJadwal.map((item, key) => {
                        return (
                            <div key={key} className='container-jadwal'>
                                <p>{item.hari}</p>
                                <div className='container-time'>
                                    <input
                                        type="time"
                                        name={item.jam_masuk}
                                        className='input'
                                        value={formatTime(item?.jam_masuk)}
                                        onChange={e => handleTimeChange(e, key, 'jam_masuk')}
                                    />
                                    <div className='line'></div>
                                    <input
                                        type="time"
                                        name={item.jam_masuk}
                                        className='input'
                                        value={formatTime(item?.jam_pulang)}
                                        onChange={e => handleTimeChange(e, key, 'jam_pulang')}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default DetailFotoProfile