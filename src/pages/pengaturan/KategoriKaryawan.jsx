import React, { useEffect, useRef, useState } from 'react'
import plusIcon from '../../assets/icons/icon-plus.svg'
import dotIcon from '../../assets/icons/dot.svg'
import kategoriImg from '../../assets/images/kategori.png'
import trashIcons from '../../assets/icons/trashRed.svg'
import editIcons from '../../assets/icons/edit.svg'
import { useDispatch, useSelector } from 'react-redux'
import { deleteKategori, getKategoriPengaturan, storeKategori, updateInputPengaturan, updateKategori } from '../../features/pengaturanSlice'
import { Link } from 'react-router-dom'
import InfoBox from '../../components/InfoBox'

function KategoriKaryawan() {
    const [showModalAddKategori, setShowModalAddKategori] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [currentMore, setCurrentMore] = useState(null)
    const [isAdd, setIsAdd] = useState(true)
    const [id, setId] = useState(null)

    const dispatch = useDispatch()
    const { listKategori, kategoriInput, statusResApi, messageResApi, isDisplayMessage } = useSelector((state) => state.pengaturan)
    const more = useRef(null)

    useEffect(() => {
        dispatch(getKategoriPengaturan())
    }, [])

    useEffect(() => {
        if (showModal) {
            document.body.classList.add("no-scroll")
        } else {
            document.body.classList.remove("no-scroll")
        }
    }, [showModal])

    function handleChange(e) {
        const { name, value } = e.target
        dispatch(updateInputPengaturan({ name, value }))
    }

    function handleSubmit() {
        if (isAdd) {
            dispatch(storeKategori(kategoriInput))
                .then((res) => {
                    if (res.meta.requestStatus === "fulfilled") {
                        setShowModalAddKategori(false)
                        dispatch(getKategoriPengaturan())
                        dispatch(updateInputPengaturan({ name: 'kategoriInput', value: '' }))
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            dispatch(updateKategori({ id, nama_kategori: kategoriInput }))
                .then((res) => {
                    if (res.meta.requestStatus === "fulfilled") {
                        setShowModalAddKategori(false)
                        dispatch(getKategoriPengaturan())
                        dispatch(updateInputPengaturan({ name: 'kategoriInput', value: '' }))
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    function handleDelete(id, kategori) {
        if (window.confirm('Yakin hapus ' + kategori)) {
            dispatch(deleteKategori(id))
                .then((res) => {
                    if (res.meta.requestStatus === "fulfilled") {
                        setCurrentMore(null)
                        dispatch(getKategoriPengaturan())
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    function handleUpdate(id, kategori) {
        setCurrentMore(null)
        setShowModalAddKategori(true)
        dispatch(updateInputPengaturan({ name: 'kategoriInput', value: kategori }))
        setIsAdd(false)
        setId(id)
    }

    function handleMore(index) {
        setCurrentMore(index)
    }

    function handleClick(e) {
        if (!e.target.closest(`.${more.current.className}`) && more) {
            setCurrentMore(null)
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    });

    return (
        <>
            <div className='kategori-karyawan'>
                <h1>Kategori Karyawan</h1>
                <div className='tambah-kategori' onClick={() => setShowModalAddKategori(true)}>
                    Tambah Kategori
                    <img src={plusIcon} alt="" />
                </div>

                {listKategori.map((item, index) => (
                    <div className='container-kategori' key={index}>
                        <Link to={`${item.kategori}/${item.id}`}>
                            <div>
                                <p>{item.kategori}</p>
                                <span>| &nbsp; &nbsp;{item.jumlah} Guru</span>
                            </div>
                        </Link>
                        <div ref={more} className='more'>
                            <img
                                src={dotIcon}
                                onClick={() => handleMore(index)}
                            />
                            {currentMore === index ?
                                <div className='dropdown-content'>
                                    <div onClick={() => handleDelete(item.id, item.kategori)}>
                                        <img src={trashIcons} alt="" />
                                        <p>Delete</p>
                                    </div>
                                    <div onClick={() => handleUpdate(item.id, item.kategori)}>
                                        <img src={editIcons} alt="" />
                                        <p>Edit</p>
                                    </div>
                                </div>
                                : null
                            }
                        </div>
                    </div>
                ))}

                {showModalAddKategori &&
                    <div className='bg-modal'>
                        <div className='modal-kategori'>
                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"
                                onClick={() => {
                                    setShowModalAddKategori(false);
                                    dispatch(updateInputPengaturan({ name: 'kategoriInput', value: '' }))
                                }}
                            >
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.03194 6.50013L12.6826 1.84948C13.1062 1.42591 13.1062 0.741255 12.6826 0.317681C12.259 -0.105894 11.5744 -0.105894 11.1508 0.317681L6.50013 4.96833L1.84948 0.317681C1.42591 -0.105894 0.741255 -0.105894 0.317681 0.317681C-0.105894 0.741255 -0.105894 1.42591 0.317681 1.84948L4.96833 6.50013L0.317681 11.1508C-0.105894 11.5744 -0.105894 12.259 0.317681 12.6826C0.528926 12.8938 0.806254 13 1.08358 13C1.36091 13 1.63824 12.8938 1.84948 12.6826L6.50013 8.03194L11.1508 12.6826C11.362 12.8938 11.6394 13 11.9167 13C12.194 13 12.4713 12.8938 12.6826 12.6826C13.1062 12.259 13.1062 11.5744 12.6826 11.1508L8.03194 6.50013Z" fill="#5A6474" />
                            </svg>
                            <img src={kategoriImg} alt="" />
                            <h3>Tambah Kategori Karyawan</h3>
                            <p>Nama Kategori</p>
                            <input
                                type="text"
                                placeholder='Masukkan Nama Kategori'
                                name='kategoriInput'
                                value={kategoriInput}
                                onChange={handleChange}
                            />
                            <button onClick={handleSubmit}>Tambahkan Kategori</button>
                        </div>
                    </div>
                }
                <InfoBox
                    message={messageResApi}
                    status={statusResApi}
                    isDisplay={isDisplayMessage}
                    setIsDisplay={updateInputPengaturan}
                    stateName='isDisplayMessage'
                />
            </div>
        </>
    )
}

export default KategoriKaryawan