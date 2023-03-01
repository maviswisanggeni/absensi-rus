import React, { useState } from 'react'
import arrowLeft from '../../assets/icons/arrow-left.svg'
import DetailProfile from './DetailProfile'
import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import hamburger from '../../assets/icons/hamburger.svg'
import close from '../../assets/icons/close.svg'
import Map from './Map'

function Detail() {
    let userId = useParams()
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [popUpMasuk, setPopUpMasuk] = useState(false);
    const [popUpKeluar, setPopUpKeluar] = useState(false);
    const [popUpMapMasuk, setPopUpMapMasuk] = useState(false);
    const [popUpMapKeluar, setPopUpMapKeluar] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function getData() {
            const url = "https://absensiguru.smkrus.com/api/kehadiran/detail/" + userId.id
            setLoading(false);
            axios.get(
                url,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setDetail(response.data.data);
                    setLoading(true);
                }).catch((error) => {
                    console.log(error);
                })
        }
        getData();
        let a = '2023-02-25'
        dayjs(a).format('DDDD-MMMM-yyyy')
    }, [userId]);

    function isImgUrl(url) {
        return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url)
    }

    function checkNull(data){
        return data ? data : '-'
    }

    return (
        <div className='detail'>
            <div className='navigation'>
                <Link to={'/kehadiran'}>
                    <img src={arrowLeft} alt="" />
                </Link>
                <h1>Detail Absensi</h1>
            </div>

            <div className='main'>
                <div className='detail-masuk-keluar'>
                    <div className='masuk-keluar'>
                        <div className='jam-masuk'>
                            <h3>Masuk</h3>
                            <p>
                                {   
                                    detail?.absen?.tanggal_masuk 
                                    ? dayjs(detail?.absen?.tanggal_masuk).format('dddd DD MMM YYYY') + ', '
                                    : '-'
                                } 
                                { 
                                    detail?.absen?.waktu_masuk ?
                                    detail?.absen?.waktu_masuk.slice(0, 5)
                                    : ''
                                }
                            </p>
                        </div>

                        <div className='card'>
                            {
                                loading ? <img className={`foto-masuk`} src={detail?.absen?.foto_masuk} alt="" onClick={() => setPopUpMasuk(popUpMasuk ? false : true)} />
                                : <div className={`foto-masuk ${loading && 'shimmer'}`}></div>
                            }
                            {
                                popUpMasuk &&
                                <div className={popUpMasuk ? 'pop-up' : ''} onClick={() => setPopUpMasuk(popUpMasuk ? false : true)}>
                                    <img className='img-user' src={detail?.absen?.foto_masuk} alt="" />
                                </div>
                            }

                            <div className='note'>
                                <h3>Note:</h3>
                                <p>{checkNull(detail?.absen?.catatan_masuk)}</p>
                            </div>
                            <div className='coordinates'>
                                <div>
                                    <h3>Lokasi</h3>
                                    <p>{checkNull(detail?.absen?.lokasi_masuk)}</p>
                                </div>
                                {popUpMapMasuk &&
                                    <>
                                        <Map latitude={detail?.absen?.latitude_masuk} longitude={detail?.absen?.longitude_masuk} loading={loading} />
                                        <div className='wrapper-close'>
                                            <img src={close} className='close' onClick={() => setPopUpMapMasuk(popUpMapMasuk ? false : true)} />
                                        </div>
                                    </>
                                }
                                                                        {/* <Map latitude={detail?.absen?.latitude_masuk} longitude={detail?.absen?.longitude_masuk} loading={loading} /> */}

                                <img src={hamburger} onClick={() => setPopUpMapMasuk(popUpMapMasuk ? false : true)} />
                            </div>
                        </div>
                    </div>
                    <div className='masuk-keluar'>
                        <div className='jam-masuk'>
                            <h3>Keluar</h3>
                            <p>
                                {
                                    detail?.absen?.tanggal_pulang
                                    ? dayjs(detail?.absen?.tanggal_pulang).format('dddd DD MMM YYYY') + ','
                                    : '-'
                                }
                                {
                                    detail?.absen?.waktu_pulang
                                    ? detail?.absen?.waktu_pulang?.slice(0, 5)
                                    : ''
                                }
                            </p>
                        </div>

                        <div className='card'>
                            {                    
                                !loading ?  <div className={`foto-masuk ${loading && 'shimmer'}`}></div> 
                                : !isImgUrl(detail?.absen?.foto_pulang) && loading ? <div className='default-foto'>Belum Keluar</div>
                                : <img className='foto-masuk' src={detail?.absen?.foto_pulang} alt="" onClick={() => setPopUpKeluar(popUpKeluar ? false : true)} />
                            }
                            {
                                popUpKeluar &&
                                <div className={popUpKeluar ? 'pop-up' : ''} onClick={() => setPopUpKeluar(popUpKeluar ? false : true)}>
                                    <img className='img-user' src={detail?.absen?.foto_pulang} alt="" />
                                </div>
                            }
                            <div className='note'>
                                <h3>Note:</h3>
                                <p>{checkNull(detail?.absen?.catatan_pulang)}</p>
                            </div>
                            <div className='coordinates'>
                                <div>
                                    <h3>Lokasi</h3>
                                    <p>{checkNull(detail?.absen?.lokasi_pulang)}</p>
                                </div>
                                {popUpMapKeluar
                                    && detail?.absen?.latitude_pulang
                                    &&
                                    <>
                                        <Map latitude={detail?.absen?.latitude_pulang} longitude={detail?.absen?.longitude_pulang} loading={loading} />
                                        <div className='wrapper-close'>
                                            <img src={close} className='close' onClick={() => setPopUpMapKeluar(popUpMapKeluar ? false : true)} />
                                        </div>
                                    </>
                                }
                                <img src={hamburger} onClick={() => setPopUpMapKeluar(popUpMapKeluar ? false : true)} />
                            </div>
                        </div>
                    </div>
                </div>
                <DetailProfile data={detail} />
            </div>


        </div>
    )
}

export default Detail