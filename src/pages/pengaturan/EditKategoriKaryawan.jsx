import React from 'react'
import { useState } from 'react'
import orang from '../../assets/images/orang.png'
import Checkbox from '../../components/kalender/Checkbox'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { assignKategori, deleteKaryawan, detailKategori, getKaryawanPengaturan, getKategoriPengaturan, setCurrentKategori, setKategoriId, updateInputPengaturan, updateListKaryawan } from '../../features/pengaturanSlice'
import { Route, Routes, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import useDebounce from '../../hooks/useDebounce'

function EditKategoriKaryawan() {
    const [current, setCurrent] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState(false)
    const [shouldCloseDropdown, setShouldCloseDropdown] = useState(false);
    const [value, setValue] = useState('')
    const dropdownRef = useRef(null);
    const debounceSearchValue = useDebounce(value, 1000)

    const dispatch = useDispatch()
    const { listKategori, loadingKategori, listKaryawan, loadingSearch, listSearchKaryawan, currentKategori, listKaryawanNotFinal, currentKaryawan } = useSelector((state) => state.pengaturan)
    const { kategori, id } = useParams()
    const [kategoriIsUpdated, setKategoriIsUpdated] = useState(false)

    useEffect(() => {
        dispatch(getKategoriPengaturan())
        setCurrent(id)
    }, [])

    useEffect(() => {
        dispatch(setCurrentKategori(kategori))
        dispatch(setKategoriId(id))
    }, [id])

    useEffect(() => {
        if (!loadingKategori) {
            setKategoriIsUpdated(true)
        }
    }, [loadingKategori])

    useEffect(() => {
        if (kategoriIsUpdated) {
            dispatch(detailKategori(id))
        }
    }, [kategoriIsUpdated, id])

    useEffect(() => {
        if (shouldCloseDropdown) {
            setActiveDropdown(false);
            setShouldCloseDropdown(false);
        }
    }, [shouldCloseDropdown]);

    useEffect(() => {
        if (activeDropdown) {
            dispatch(getKaryawanPengaturan({ search: debounceSearchValue }));
        }
    }, [debounceSearchValue]);

    function handleShowModal() {
        setShowModal(prevShowModal => !prevShowModal)
    }

    useEffect(() => {
        if (showModal) {
            document.body.classList.add("no-scroll")
        } else {
            document.body.classList.remove("no-scroll")
        }
    }, [showModal])

    function handleChange(e) {
        const inputValue = e.target.value;
        // dispatch(setLoading(true))
        setValue(inputValue);
        setActiveDropdown(inputValue.length > 0);
    }

    function handleAdd(item) {
        dispatch(updateListKaryawan(item))
        setActiveDropdown(false)
    }

    function handleBlur() {
        setTimeout(() => {
            if (!dropdownRef.current.contains(document.activeElement)) {
                setShouldCloseDropdown(true);
            }
        }, 200);
    }

    function handleChangeCheckbox(index, name, item) {
        // dispatch(deleteKaryawan({ name, index }))
        dispatch(updateInputPengaturan({ name: 'currentKaryawan', value: item }))
        setShowAlert(true)
    }

    function handleAssignKategori() {
        const filterListKaryawan = listKaryawanNotFinal.filter(item => item.isChecked)
        dispatch(assignKategori({
            kategori_id: id,
            karyawan_id: filterListKaryawan
        }))
            .then((res) => {
                if (res.meta.requestStatus === "fulfilled") {
                    dispatch(detailKategori(id))
                    handleShowModal()
                }
            })
    }

    const handleDelete = () => {
        dispatch(deleteKaryawan({ name: 'listKaryawan', index: currentKaryawan.id }));
        setShowAlert(false)
    };

    return (
        <div className='detail-kategori-karyawan'>
            <Routes>
                <Route path='/:kategori/:id' element={<EditKategoriKaryawan />} />
            </Routes>
            <div className='wrapper-kategori'>
                <h1>Kategori Karyawan</h1>
                {listKategori.map((data, index) => (
                    <Link to={`/pengaturan/kategori-karyawan/${data.kategori}/${data.id}`} key={index}>
                        <div className={`${data.id == current ? 'active' : ''} kategori`} onClick={() => setCurrent(data.id)}>
                            <p>{data.kategori}</p>
                            <span>{data.jumlah + " Guru"}</span>
                        </div>
                    </Link>
                ))}
            </div>

            <div className='wrapper-edit-kategori'>
                <div className='wrapper-text'>
                    <h1>Edit Kategori Karyawan</h1>
                    <h2 onClick={() => handleShowModal()}>Tambahkan Karyawan</h2>
                </div>
                <div className='wrapper-column'>
                    {loadingKategori ? 'loading' :
                        listKaryawan.map((item, index) => {
                            if (!item.isChecked) return null;
                            return (
                                <div className='wrapper-list' key={index}>
                                    <div className='list-content-left'>
                                        <img src={item.link_foto} alt="" />
                                        <div>
                                            <p>{item.nama}</p>
                                            <span>{item?.ktgkaryawan?.map(item => item?.kategori + ', ')}</span>
                                        </div>
                                    </div>
                                    <input
                                        type="checkbox"
                                        name='listKaryawan'
                                        checked={item.isChecked}
                                        onChange={() => handleChangeCheckbox(index, 'listKaryawan', item)}
                                    />
                                </div>
                            )
                        })}
                </div>
            </div>
            {showAlert && <div className='bg-modal'>
                <div className='alert-modal'>
                    <h1>Edit Kategori Karyawan</h1>
                    <p>Kamu yakin hapus karyawan dari kategori?</p>
                    <div>
                        <button onClick={() => setShowAlert(false)}>Tidak</button>
                        <button onClick={handleDelete}>Iya</button>
                    </div>
                </div>
            </div>}

            {
                showModal && <div className='bg-modal'>
                    <div className='modal-tambah-anggota'>
                        <h1>Tambah Anggota</h1>
                        <h3>Guru Anggota {currentKategori}</h3>
                        <div className='padding'>
                            <input
                                type="text"
                                placeholder='Cari Anggota'
                                value={value}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onFocus={() => setActiveDropdown(true)}
                            />
                            {activeDropdown && (
                                <div className='dropdown-container'>
                                    <div className='dropdown-content' ref={dropdownRef}>
                                        {loadingSearch ? (
                                            <div className='dropdown-outer-item'>
                                                <div className='dropdown-item'>
                                                    <p>Loading...</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                {listSearchKaryawan.length === 0 ? (
                                                    <div className='dropdown-outer-item'>
                                                        <div className='dropdown-item not-found'>
                                                            <div>
                                                                <p>Data tidak ada</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    listSearchKaryawan.map((item, index) => (
                                                        <div className='dropdown-outer-item' key={index}>
                                                            <div className='dropdown-item'>
                                                                <div>
                                                                    <img src={item.link_foto} alt='' />
                                                                    <p>{item.nama}</p>
                                                                </div>
                                                                <button onClick={() => handleAdd(item)}>Tambahkan</button>
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                            <p>Anggota</p>
                            <div className='wrapper-list'>
                                {listKaryawanNotFinal.map((item, index) => (
                                    <div className='container-anggota' key={index}>
                                        <Checkbox
                                            name='listKaryawanNotFinal'
                                            control={index}
                                            onChange={() => handleChangeCheckbox(index, 'listKaryawanNotFinal')}
                                            checked={item.isChecked}
                                        />
                                        <img src={item.link_foto} alt="" />
                                        <label htmlFor={index}>{item.nama}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='wrappper-btn'>
                            <button onClick={() => handleShowModal()}>Cancel</button>
                            <button onClick={handleAssignKategori}>Tambah</button>
                        </div>
                    </div>
                </div>
            }
        </div >
    )
}

export default EditKategoriKaryawan