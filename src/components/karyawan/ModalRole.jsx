import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../Search';
import { getKategori } from '../../features/ketegoriSlice';
import { updateListKtgkaryawan } from '../../features/detailKaryawanSlice';
import { useState } from 'react';

function ModalRole({ onClose }) {
    const { listKategori, loadingKategori } = useSelector(
        (state) => state.kategori
    );
    const dispatch = useDispatch()
    const [modalOpen, setModalOpen] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
        if (modalOpen) {
            dispatch(getKategori());
            document.body.classList.add('modal-open');
        }
        return () => {
            document.body.classList.remove('modal-open');
        }
    }, []);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    function handleAdd(kategori, id) {
        dispatch(updateListKtgkaryawan({ kategori, id }));
    }

    return (
        <div className='bg-modal'>
            <div className='modal-container' ref={modalRef}>
                <h1>Tambah Jabatan</h1>
                <Search placeholder='Jabatan' />
                <div className='wrapper-list'>
                    {loadingKategori
                        ? listKategori.map((item, index) => (
                            <div className='container-list' key={index} onClick={() => handleAdd(item.kategori, item.id)}>
                                <p>{item.kategori}</p>
                                <p>+</p>
                            </div>
                        ))
                        : <span>Loading...</span>
                    }
                </div>
            </div>
        </div>
    )
}

export default ModalRole