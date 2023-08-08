import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletePeserta, updateFieldError } from '../../features/kalenderSlice'
import useImgError from '../../hooks/useImgError'
import DisplayKategoriList from '../DisplayKategoriList'
import { useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'

function ListPartisipasi() {
    const { peserta, loadngGetKaryawan, errors } = useSelector((state) => state.kalender)
    const dispatch = useDispatch()
    const [isOverflowed, setIsOverflowed] = useState(false)
    const refContainer = useRef()

    const handleCheckboxChange = (index) => {
        dispatch(deletePeserta(index))
    };

    useEffect(() => {
        if (peserta.length !== 0) {
            dispatch(updateFieldError({
                field: 'peserta',
                value: ''
            }))
        }
    }, [peserta])

    useEffect(() => {
        const container = document.querySelector('.wrapper-column');

        const handleMutation = () => {
            setIsOverflowed(container.scrollHeight > 400);
        };

        const observer = new MutationObserver(handleMutation);
        handleMutation();

        observer.observe(container, { childList: true, subtree: true });

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div className={`wrapper-column ${isOverflowed ? 'overflowed' : ''}`} ref={refContainer}>
            {peserta.length > 0 &&
                peserta.map((item, index) => (
                    <div className='wrapper-list' key={index}>
                        <div className='list-content-left'>
                            <img src={item.link_foto} onError={useImgError} alt="" />
                            <div>
                                <p>{item.nama}</p>
                                <span>
                                    <DisplayKategoriList list={item.ktgkaryawan} />
                                </span>
                            </div>
                        </div>
                        <input type='checkbox' checked={item.isChecked} onChange={() => handleCheckboxChange(index)} />
                    </div>
                ))
            }
            {loadngGetKaryawan && <div className='container_skeleton'>
                {Array.from({ length: 5 }, (_, index) => (
                    <div className='container__list__skeleton' key={index}>
                        <div className='left__content'>
                            <Skeleton width={35} height={35} circle={true} />
                            <div>
                                <Skeleton width={100} height={20} />
                                <Skeleton width={70} height={14} />
                            </div>
                        </div>
                        <Skeleton width={24} height={24} circle={true} />
                    </div>
                ))}
            </div>
            }
            <p className='validator-text'>{errors.peserta && errors.peserta}</p>
        </div>
    )
}

export default ListPartisipasi