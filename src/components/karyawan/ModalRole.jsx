import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../Search';
import { getKategori, updateStateKategori } from '../../features/ketegoriSlice';
import { updateFieldValue, updateListKtgkaryawan } from '../../features/karyawanSlice';
import { useState } from 'react';

function ModalRole({ onClose }) {
    const { loadingKategori, search, searchedKategori } = useSelector(
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
                <Search placeholder='Jabatan' value={search} setSearch={updateStateKategori} stateName='search' />
                <div className='wrapper-list'>
                    {!loadingKategori
                        ? searchedKategori.map((item, index) => (
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