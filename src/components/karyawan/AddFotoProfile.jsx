import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import uploadClour from '../../assets/icons/cloud-upload.svg'
import { useApiKaryawanStoreUser } from '../../contexts/api/karyawan/ContextApiKaryawanStoreUser';

function FotoProfile({ callback }) {
    const context = useApiKaryawanStoreUser()
    const [file, setFile] = useState({});
    const inputRef = useRef(null);
    // drag state
    const [dragActive, setDragActive] = useState(false);
    // handle drag events
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
            // at least one file has been dropped so do something
            // handleFiles(e.dataTransfer.files);
            console.log(e.dataTransfer.files);
            setFile(e.dataTransfer.files[0]);
            context.setFoto(e.dataTransfer.files[0]);
        }
    };

    const handleChange = function (e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            // at least one file has been selected so do something
            // handleFiles(e.target.files);
            setFile(e.target.files[0]);
            context.setFoto(e.target?.files[0])
            // console.log(e.target.files);
        }
    };

    const onButtonClick = () => {
        inputRef.current.click();
    };

    useEffect(() => {
        callback(file)
    }, [file])

    return (
        <div onDragEnter={handleDrag} className='form-file-upload'>
            <h1>Foto Profile</h1>
            <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
            <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
                <div className='wrap-text'>
                    <img src={uploadClour} alt="" />
                    <h1>{file.name === undefined ? 'Tambahkan Foto' : file?.name}</h1>
                    {/* <h1></h1> */}
                    <button className="upload-button" onClick={onButtonClick}>Upload dari Komputer atau drag-n-drop image <br />ber format .png or .jpg</button>
                </div>
            </label>
            {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
        </div>
    )
}

export default FotoProfile