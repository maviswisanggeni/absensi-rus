import React, { useEffect } from 'react'
import Button from '../../components/Button'
import Tabbar from '../../components/Tabbar'
import { emptyKaryawan, getKaryawanPengaturan, getKategoriPengaturan, importKaryawan, setCurrentKategori, setKategoriId, updateInputPengaturan } from '../../features/pengaturanSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Table from '../../components/pengaturan/Table'
import { useRef } from 'react'
import { useState } from 'react'
import kategoriImg from '../../assets/images/kategori.png'
import LoadingFullscreen from '../../components/LoadingFullscreen'
import LoadingTable from '../../components/LoadingTable'

function ImportUser() {
    const dispatch = useDispatch()
    const { listKategori, loadingKategori, kategoriId, loadingImport, loadingKaryawan } = useSelector(state => state.pengaturan)
    const [file, setFile] = useState()
    const [showModal, setShowModal] = useState(false)
    const [isUpdateKategori, setIsUpdateKategori] = useState(false)
    let [searchParams] = useSearchParams();
    const inputRef = useRef()
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getKategoriPengaturan())
        setIsUpdateKategori(true)
        dispatch(emptyKaryawan())
    }, [])

    useEffect(() => {
        const currentPath = location.pathname;
        if (currentPath === '/pengaturan/import-user' && listKategori.length > 0) {
            const defaultPath = `/pengaturan/import-user/${listKategori[0]?.kategori}`;
            navigate(defaultPath);
        }
    }, [location.pathname, listKategori])

    useEffect(() => {
        if (isUpdateKategori) {
            dispatch(getKaryawanPengaturan({
                kategori_id: kategoriId,
                route: 'karyawan'
            }))
        }
    }, [kategoriId])

    useEffect(() => {
        dispatch(updateInputPengaturan({ name: 'currentPage', value: 1 }))
    }, [location.pathname.split('/').pop()]);

    function handleChange(e) {
        e.preventDefault();
        setShowModal(true)
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    }

    function handleImport() {
        dispatch(importKaryawan({ file: file }))
            .then((res) => {
                if (res.meta.requestStatus === "fulfilled") {
                    setShowModal(false)
                    inputRef.current.value = '';
                    dispatch(getKaryawanPengaturan({
                        kategori_id: kategoriId,
                        route: 'karyawan'
                    }))
                }
            })
    }
    console.log(showModal);
    return (
        <div className='import-user'>
            <div className='top-table'>
                <p>
                    {listKategori.map((item, index) => (
                        <React.Fragment key={index}>
                            {`${item?.jumlah} ${item?.kategori}`}
                            {index !== listKategori?.length - 1 && ','}{' '}
                        </React.Fragment>
                    ))}
                </p>
                <Button
                    text={'Import Data'}
                    style={{ width: '157px', height: '45px' }}
                    onClick={() => {
                        inputRef.current.click()
                    }}
                />
                <input
                    ref={inputRef}
                    type="file"
                    onChange={handleChange}
                    accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                />

                {showModal &&
                    <div className='bg-modal'>
                        <div className='modal-konfirm'>
                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"
                                onClick={() => {
                                    setShowModal(false);
                                    if (inputRef.current) {
                                        inputRef.current.value = '';
                                    }

                                }}
                            >
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.03194 6.50013L12.6826 1.84948C13.1062 1.42591 13.1062 0.741255 12.6826 0.317681C12.259 -0.105894 11.5744 -0.105894 11.1508 0.317681L6.50013 4.96833L1.84948 0.317681C1.42591 -0.105894 0.741255 -0.105894 0.317681 0.317681C-0.105894 0.741255 -0.105894 1.42591 0.317681 1.84948L4.96833 6.50013L0.317681 11.1508C-0.105894 11.5744 -0.105894 12.259 0.317681 12.6826C0.528926 12.8938 0.806254 13 1.08358 13C1.36091 13 1.63824 12.8938 1.84948 12.6826L6.50013 8.03194L11.1508 12.6826C11.362 12.8938 11.6394 13 11.9167 13C12.194 13 12.4713 12.8938 12.6826 12.6826C13.1062 12.259 13.1062 11.5744 12.6826 11.1508L8.03194 6.50013Z" fill="#5A6474" />
                            </svg>
                            <img src={kategoriImg} alt="" />
                            <h3>Import File </h3>
                            <p>{file?.name}</p>
                            <button onClick={handleImport}>Konfirmasi</button>
                        </div>
                    </div>
                }

            </div>
            {/* {loadingKategori
                ?
                <div className='wrapper-loading'>
                    <div className='dots loading'><p>Loading...</p></div>
                </div>
                : <div className='wrapper-tabbar'>
                    <Tabbar
                        options={listKategori}
                        setKategoriId={setKategoriId}
                        setCurrentKategori={setCurrentKategori}
                        setKeterangan={updateInputPengaturan}
                        searchParams={searchParams.toString()}
                        path='/pengaturan/import-user'
                        loading={loadingKategori}
                    />
                </div>
            } */}
            {!loadingKategori
                ? <div className='wrapper-tabbar'>
                    <Tabbar
                        options={listKategori}
                        setKategoriId={setKategoriId}
                        setCurrentKategori={setCurrentKategori}
                        setKeterangan={updateInputPengaturan}
                        searchParams={searchParams.toString()}
                        path='/pengaturan/import-user'
                        loading={loadingKategori}
                    />
                </div>

                : <div className='wrapper__skeleton'>
                    <div className='wrapper__tabbar'>
                        <div className='list__text__skeleton'>
                            {Array.from({ length: 5 }, (_, index) => (
                                <div key={index}>
                                </div>
                            ))}
                        </div>

                        <div className='right__square'></div>
                    </div>

                    <LoadingTable size={'large'} />
                </div>
            }

            {(loadingKategori || loadingKaryawan) ?
                <LoadingTable />
                : <Table />

            }
            <LoadingFullscreen loading={loadingImport} />
        </div>
    )
}

export default ImportUser