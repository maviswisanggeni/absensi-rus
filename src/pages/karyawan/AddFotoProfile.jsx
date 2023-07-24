import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import uploadClour from '../../assets/icons/cloud-upload.svg'
import { useApiKaryawanStoreUser } from '../../contexts/api/karyawan/ContextApiKaryawanStoreUser';
import { useDispatch, useSelector } from 'react-redux';
import { showFormError, updateFieldError, updateFieldValue } from '../../features/karyawanSlice';

function FotoProfile({ callbackFile, callbackIsLoad }) {
    const context = useApiKaryawanStoreUser()
    const { listJadwal, errors, isFormErrorShown, isFileSend } = useSelector(
        (state) => state.karyawan
    );
    const dispatch = useDispatch()
    const [file, setFile] = useState({});
    const [previewImg, setPreviewImg] = useState(null)
    const inputRef = useRef(null);
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
            callbackIsLoad(true)
            setPreviewImg(URL.createObjectURL(e.dataTransfer.files[0]))
        }
    };

    const handleChange = function (e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            callbackIsLoad(true)
            setPreviewImg(URL.createObjectURL(e.target.files[0]))
            context.setFoto(e.target?.files[0])
        }
    };

    const onButtonClick = () => {
        inputRef.current.click();
    };

    useEffect(() => {
        callbackFile(file)

        if (file.name) {
            dispatch(updateFieldValue({ field: 'isFileSend', value: true }))
        }
    }, [file])

    const handleTimeChange = (e, index, property) => {
        const { value } = e.target;
        console.log(value);
        const updatedListJadwal = [...listJadwal];

        const updatedItem = { ...updatedListJadwal[index] };

        updatedItem[property] = value;

        updatedListJadwal[index] = updatedItem;

        dispatch(updateFieldValue({ field: 'listJadwal', value: updatedListJadwal }));
    };

    useEffect(() => {
        if (isFileSend) {
            dispatch(updateFieldError({
                field: 'isFileSend',
                error: ''
            }))
            dispatch(showFormError('isFileSend'))
        }
    }, [isFileSend, dispatch])

    useEffect(() => {
        if (listJadwal.some((jadwal) => jadwal.jam_masuk !== '' && jadwal.jam_pulang !== '')) {
            dispatch(updateFieldError({
                field: 'jadwal',
                error: ''
            }))
            dispatch(showFormError('jadwal'))
        }
    }, [listJadwal, dispatch])

    return (
        <div>
            <div onDragEnter={handleDrag} className='form-file-upload'>
                <h1>Foto Profile</h1>
                <input ref={inputRef} type="file" id="input-file-upload" onChange={handleChange} accept="image/png, image/gif, image/jpeg" />
                <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
                    {!previewImg ?
                        <div className='wrap-text'>
                            <img src={uploadClour} alt="" />
                            <h1>{file.name === undefined ? 'Tambahkan Foto' : file?.name}</h1>
                            <button className="upload-button" onClick={onButtonClick}>Upload dari Komputer atau drag-n-drop image <br />ber format .png or .jpg</button>
                        </div>
                        : <img className='preview__img' src={previewImg} alt="" />
                    }
                </label>
                {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
            </div>

            <p className='validator-text'>
                {errors.isFileSend && errors.isFileSend}
            </p>

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
                                    // value={item.jam_masuk ? formatTime(item.jam_masuk) : ''}
                                    value={item.jam_masuk}
                                    onChange={e => handleTimeChange(e, key, 'jam_masuk')}
                                />
                                <div className='line'></div>
                                <input
                                    type="time"
                                    name={item.jam_pulang}
                                    className='input'
                                    // value={item.jam_pulang ? formatTime(item.jam_pulang) : ''}
                                    value={item.jam_pulang}
                                    onChange={e => handleTimeChange(e, key, 'jam_pulang')}
                                />
                            </div>
                        </div>
                    )
                })}
                <p className='validator-text'>
                    {errors.jadwal && errors.jadwal}
                </p>
            </div>
        </div>
    )
}

export default FotoProfile