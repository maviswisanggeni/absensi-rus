import React, { useRef, useState } from 'react'
import { useApiKaryawanUpdate } from '../../contexts/api/karyawan/ContextApiKaryawanEdit'
import Label from './Label'
import Select from './Select'
import imgIcon from '../../assets/icons/img-icon.svg'

function DetailFotoProfile({detailData}) {
    const context = useApiKaryawanUpdate()
    const [image, setImage] = useState(null)

    let data = [
        {
            id: 1,
            nama: 'Pengajar'
        },
        {
            id: 2,
            nama: 'Staff'
        },
    ]

    let gender = [
        {
            id: 1,
            nama: 'Laki-laki'
        },
        {
            id: 2,
            nama: 'Perempuan'
        },
    ]

    const inputRef = useRef(null)


    const handleChange = function (e) {
        if (e.target.files && e.target.files[0]) {
            // at least one file has been selected so do something
            // handleFiles(e.target.files);
            setImage(URL.createObjectURL(e.target.files[0]));
            context.setFoto(e.target?.files[0])
        }
    };

    return (
        <div className='detail-profile'>
            <div className='div-1'>
                <h1>Foto Profile</h1>
                <div className='wrapper-img'>
                    <img src={
                        image ? image : detailData.pf_foto
                        } alt="" />
                    <div className='edit-img'>
                        <input type="file" ref={inputRef} onChange={handleChange}/>
                        <img src={imgIcon} onClick={() => inputRef.current.click()} />
                    </div>
                </div>
                <h3>{detailData.nama}</h3>
                <p>{detailData.niy}</p>
            </div>
            <div className='jabatan-gender'>
                <div className='jabatan select'>
                    <Label className='jabatan' label='Jabatan' />
                    <Select data={data} amountData={data.length + 1} select={context.jenisUser == 'pengajar' ? 'Pengajar' : 'Staff'}
                    func={context.setjenisUser} 
                    />
                </div>
            </div>
        </div>
    )
}

export default DetailFotoProfile