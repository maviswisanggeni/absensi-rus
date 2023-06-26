import React from 'react'
import { useState } from 'react'
import Checkbox from '../../components/kalender/Checkbox'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { assignKategori, deleteKaryawan, detailKategori, getKaryawanPengaturan, getKategoriPengaturan, searchKaryawan, setCurrentKategori, setKategoriId, unassignKategori, updateInputPengaturan } from '../../features/pengaturanSlice'
import { Route, Routes, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useRef } from 'react'

function EditKategoriKaryawan() {
    const [current, setCurrent] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [value, setValue] = useState('')
    const dropdownRef = useRef(null);

    const dispatch = useDispatch()
    const { listKategori, loadingKategori, listKaryawan, loadingSearch, listSearchKaryawan,
        currentKategori, listKaryawanNotFinal, currentKaryawan, kategoriId
    } = useSelector((state) => state.pengaturan)
    const { kategori, id } = useParams()
    const [kategoriIsUpdated, setKategoriIsUpdated] = useState(false)

    useEffect(() => {
        dispatch(getKategoriPengaturan())
        dispatch(getKaryawanPengaturan({ search: null }))
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
        setValue(inputValue);
        dispatch(searchKaryawan({ name: 'listSearchKaryawan', value: inputValue }))
    }

    function handleChangeCheckbox(name, item, index) {
        if (name === 'listKaryawan') {
            dispatch(updateInputPengaturan({ name: 'currentKaryawan', value: item }))
            setShowAlert(true)
        } else {
            dispatch(deleteKaryawan({ name: 'listKaryawanNotFinal', index }));
        }
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
        console.log(currentKaryawan);
        dispatch(unassignKategori({
            kategori_id: kategoriId,
            user_id: currentKaryawan.id
        }))
            .then((res) => {
                if (res.meta.requestStatus === "fulfilled") {
                    dispatch(detailKategori(id))
                    handleShowModal()
                    setShowAlert(false)
                }
            })
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
                    {loadingKategori ? <div className='loading dots'><p>Loading...</p></div>
                        : listKaryawan.map((item, index) => {
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
                                        onChange={() => handleChangeCheckbox('listKaryawan', item, index)}
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
                            />
                            <p>Anggota</p>
                            <div className='wrapper-list'>
                                {listKaryawanNotFinal.map((item, index) => (
                                    <div className='container-anggota' key={index}>
                                        <Checkbox
                                            name='listKaryawanNotFinal'
                                            control={index}
                                            onChange={() => handleChangeCheckbox('listKaryawanNotFinal', item, item.id)}
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