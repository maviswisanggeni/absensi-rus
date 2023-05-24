import React, { useEffect, useRef, useState } from 'react'
import { useApiKaryawanUpdate } from '../../contexts/api/karyawan/ContextApiKaryawanEdit'
import Label from './Label'
import Select from './Select'
import imgIcon from '../../assets/icons/img-icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { deleteListItemKtgkaryawan, updateFieldValue } from '../../features/detailKaryawanSlice'
import close from '../../assets/icons/close.svg'
import plus from '../../assets/icons/plus.svg'
import ModalRole from './ModalRole'

function DetailFotoProfile({ callback }) {
    const dispatch = useDispatch()
    const context = useApiKaryawanUpdate()
    const [image, setImage] = useState(null)
    const [file, setFile] = useState(null)
    const { nama, niy, linkFoto, listKtgkaryawan, ktgKaryawan, listJadwal } = useSelector(
        (state) => state.detailKaryawanSlice
    );
    const [modalActive, setModalActive] = useState(false)

    const inputRef = useRef(null)

    const handleChange = function (e) {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
            setFile(e.target.files[0])
            context.setFoto(e.target?.files[0])
        }
    };

    useEffect(() => {
        callback(file)
    }, [file])

    const handleSelect = function (e) {
        const { value } = e.target;
        dispatch(updateFieldValue({ field: 'ktgKaryawan', value }));
    }

    const formatTime = time => {
        const [hours, minutes] = time.split(':');
        const paddedHours = hours.padStart(2, '0'); // Add leading zero if necessary
        return `${paddedHours}:${minutes}`;
    };

    const handleTimeChange = (e, index, property) => {
        const { value } = e.target;

        // Create a copy of the listJadwal array
        const updatedListJadwal = [...listJadwal];

        // Create a copy of the specific item in the listJadwal array
        const updatedItem = { ...updatedListJadwal[index] };

        // Update the specific property in the copied item
        updatedItem[property] = formatTime(value); // Format the time value

        // Update the specific item in the copied listJadwal array
        updatedListJadwal[index] = updatedItem;

        // Dispatch the updateFieldValue action with the updated listJadwal
        dispatch(updateFieldValue({ field: 'listJadwal', value: updatedListJadwal }));
    };

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
                    <div className='wrapper-container-jabatan'>
                        {listKtgkaryawan.map((item, key) => (
                            <div className='container-jabatan' key={key}>
                                <p>{item.kategori}</p>
                                <img src={close} alt="" onClick={() => dispatch(deleteListItemKtgkaryawan({ id: item.id }))} />
                            </div>
                        ))}
                        <div className='container-jabatan btn-plus' onClick={() => setModalActive(true)}>
                            <img src={plus} alt="" />
                        </div>
                        {modalActive && <ModalRole onClose={() => setModalActive(false)} />}
                    </div>
                </div>
                <div className='jadwal-absensi'>
                    <h1>Jadwal Absensi</h1>
                    {listJadwal.map((item, key) => {
                        return (
                            <div key={key} className='container-jadwal'>
                                <p>{item.hari}</p>
                                <div className='container-time'>
                                    <input
                                        type="time"
                                        name={item.jam_masuk}
                                        className='input'
                                        value={formatTime(item.jam_masuk)}
                                        onChange={e => handleTimeChange(e, key, 'jam_masuk')}
                                    />
                                    <div className='line'></div>
                                    <input
                                        type="time"
                                        name={item.jam_masuk}
                                        className='input'
                                        value={formatTime(item.jam_pulang)}
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