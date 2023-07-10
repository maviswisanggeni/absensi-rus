import React, { useState } from 'react'
import orang from '../../assets/images/orang.png'
import { useDispatch, useSelector } from 'react-redux'
import { getKaryawanKalender, setLoading, updateListPeserta } from '../../features/kalenderSlice'
import useDebounce from '../../hooks/useDebounce'
import { useEffect } from 'react'
import { useRef } from 'react'
import useImgError from '../../hooks/useImgError'
import DisplayKategoriList from '../DisplayKategoriList'

function SearchDropdown() {
    const [activeDropdown, setActiveDropdown] = useState(false)
    const [value, setValue] = useState('')
    const [shouldCloseDropdown, setShouldCloseDropdown] = useState(false);
    const dispatch = useDispatch()
    const debounceSearchValue = useDebounce(value, 1000)
    const { listSearchPeserta, loadingSearch } = useSelector((state) => state.kalender)
    const dropdownRef = useRef(null);

    function handleChange(e) {
        const inputValue = e.target.value;
        dispatch(setLoading(true))
        setValue(inputValue);
        setActiveDropdown(inputValue.length > 0);
    }

    useEffect(() => {
        if (activeDropdown) {
            dispatch(getKaryawanKalender({ search: debounceSearchValue }));
        }
    }, [debounceSearchValue]);

    useEffect(() => {
        if (shouldCloseDropdown) {
            setActiveDropdown(false);
            setShouldCloseDropdown(false);
        }
    }, [shouldCloseDropdown]);

    function handleAdd(item) {
        dispatch(updateListPeserta(item))
        setActiveDropdown(false)
    }

    function handleBlur() {
        setTimeout(() => {
            if (!dropdownRef.current.contains(document.activeElement)) {
                setShouldCloseDropdown(true);
            }
        }, 200);
    }

    return (
        <div className='wrapper-search-dropdown'>
            <input
                type='text'
                placeholder='Invite Karyawan'
                className='input'
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={() => setActiveDropdown(true)}
            />
            <div className='dropdown-container'>
                {activeDropdown && (
                    <div className='dropdown-content' ref={dropdownRef}>
                        {loadingSearch ? (
                            <div className='dropdown-outer-item'>
                                <div className='dropdown-item'>
                                    <p>Loading...</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                {listSearchPeserta.length === 0 ? (
                                    <div className='dropdown-outer-item'>
                                        <div className='dropdown-item not-found'>
                                            <div>
                                                <p>Data tidak ada</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    listSearchPeserta.map((item, index) => (
                                        <div className='dropdown-outer-item' key={index}>
                                            <div className='dropdown-item'>
                                                <div>
                                                    <img src={item.link_foto} onError={useImgError} alt='' />
                                                    <p>{item.nama}</p>
                                                    <span>
                                                        /
                                                        <DisplayKategoriList list={item.ktgkaryawan} />
                                                    </span>
                                                </div>
                                                <button onClick={() => handleAdd(item)}>Tambahkan</button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchDropdown