import React from 'react'
import { useApiKaryawanUpdate } from '../../contexts/api/karyawan/ContextApiKaryawanEdit'
import Label from './Label'
import Select from './Select'

function DetailFotoProfile({detailData}) {
    const context = useApiKaryawanUpdate()
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
    return (
        <div className='detail-profile'>
            <div className='div-1'>
                <h1>Foto Profile</h1>
                <img src={detailData.pf_foto} alt="" />
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
                <div className='gender select'>
                    <Label className='gender' label='Gender' />
                    <Select data={gender} amountData={gender.length + 1} />
                </div>
            </div>
        </div>
    )
}

export default DetailFotoProfile