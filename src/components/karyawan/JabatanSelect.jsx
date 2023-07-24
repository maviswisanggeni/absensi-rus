import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ModalRole from './ModalRole';
import { deleteKategori, showFormError, updateFieldError } from '../../features/karyawanSlice';
import close from '../../assets/icons/close.svg'
import plus from '../../assets/icons/plus.svg'
import { useState } from 'react';

function JabatanSelect() {
    const dispatch = useDispatch()
    const [modalActive, setModalActive] = useState(false)
    const { listKtgkaryawan } = useSelector(
        (state) => state.karyawan
    );

    useEffect(() => {
        if (listKtgkaryawan.length !== 0) {
            dispatch(updateFieldError({
                field: 'listKtgkaryawan',
                error: ''
            }))
            dispatch(showFormError('listKtgkaryawan'));
        }
    }, [listKtgkaryawan, dispatch])

    return (
        <div className='wrapper-container-jabatan'>
            {listKtgkaryawan.map((item, key) => (
                <div className='container-jabatan' key={key}>
                    <p>{item.kategori}</p>
                    <img src={close} alt="" onClick={() => dispatch(deleteKategori({ id: item.id }))} />
                </div>
            ))}
            <div className='container-jabatan btn-plus' onClick={() => setModalActive(true)}>
                <img src={plus} alt="" />
            </div>
            {modalActive && <ModalRole onClose={() => setModalActive(false)} />}
        </div>
    )
}

export default JabatanSelect