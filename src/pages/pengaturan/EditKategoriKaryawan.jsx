import React from 'react'
import { useState } from 'react'
import Checkbox from '../../components/kalender/Checkbox'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { assignKategori, deleteKaryawan, detailKategori, getKaryawanPengaturan, getKategoriPengaturan, searchKaryawan, setCurrentKategori, setKategoriId, unassignKategori, updateInputPengaturan } from '../../features/pengaturanSlice'
import { Route, Routes, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import DisplayKategoriList from '../../components/DisplayKategoriList'
import useImgError from '../../hooks/useImgError'
import LoadingFullscreen from '../../components/LoadingFullscreen'

function EditKategoriKaryawan() {
    const [current, setCurrent] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [value, setValue] = useState('')

    const dispatch = useDispatch()
    const { listKategori, loadingKategori, listKaryawan, loadingAssign,
        currentKategori, listKaryawanNotFinal, currentKaryawan, kategoriId
    } = useSelector((state) => state.pengaturan)
    const { kategori, id } = useParams()
    const [kategoriIsUpdated, setKategoriIsUpdated] = useState(false)

    useEffect(() => {
        dispatch(getKategoriPengaturan())
        dispatch(getKaryawanPengaturan({ route: 'setting' }))
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
            dispatch(deleteKaryawan({ name: 'listSearchKaryawan', index }));
        }
    }

    function handleAssignKategori() {
        const selectedListKaryawan = listKaryawanNotFinal.filter(item => item.isChecked).concat(listKaryawan)
        dispatch(assignKategori({
            kategori_id: id,
            karyawan: selectedListKaryawan
        }))
            .then((res) => {
                if (res.meta.requestStatus === "fulfilled") {
                    dispatch(detailKategori(id))
                    dispatch(getKategoriPengaturan())
                    dispatch(getKaryawanPengaturan({ route: 'setting' }))
                    handleShowModal()
                }
            })
    }

    const handleDelete = () => {
        dispatch(deleteKaryawan({ name: 'listKaryawan', index: currentKaryawan.id }));
        dispatch(unassignKategori({
            kategori_id: kategoriId,
            user_id: currentKaryawan.id
        }))
            .then((res) => {
                if (res.meta.requestStatus === "fulfilled") {
                    dispatch(detailKategori(id))
                    dispatch(getKategoriPengaturan())
                    dispatch(getKaryawanPengaturan({ route: 'setting' }))
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
                                        <img src={item.link_foto} onError={useImgError} alt="" />
                                        <div>
                                            <p>{item.nama}</p>
                                            <span>
                                                <DisplayKategoriList list={item.ktgkaryawan} />
                                            </span>
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
                            <h4>Anggota</h4>
                            <div className='wrapper-list'>
                                {listKaryawanNotFinal.length === 0 ? <p className='empty'>Data tidak ditemukan</p>
                                    : listKaryawanNotFinal.map((item, index) => {
                                        const isCurrentId = item.ktgkaryawan.some((data) => data.id == kategoriId);

                                        if (!isCurrentId) {
                                            return (
                                                <div className='container-anggota' key={index}>
                                                    <Checkbox
                                                        name='listKaryawanNotFinal'
                                                        control={index}
                                                        onChange={() => handleChangeCheckbox('listKaryawanNotFinal', item, item.id)}
                                                        checked={item.isChecked}
                                                    />
                                                    <img src={item.link_foto} onError={useImgError} alt='' />
                                                    <label htmlFor={index}>{item.nama}</label>
                                                </div>
                                            );
                                        }
                                    })

                                }
                            </div>
                        </div>
                        <div className='wrappper-btn'>
                            <button onClick={() => handleShowModal()}>Cancel</button>
                            <button onClick={handleAssignKategori}>Tambah</button>
                        </div>
                    </div>
                </div>
            }
            <LoadingFullscreen loading={loadingAssign} />
        </div>
    )
}

export default EditKategoriKaryawan