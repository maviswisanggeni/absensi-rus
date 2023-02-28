import React, { useState } from 'react'
import arrowLeft from '../../assets/icons/arrow-left.svg'
import DetailProfile from './DetailProfile'
import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import defaultFoto from '../../assets/images/user-foto.png'

function Detail() {
    let userId = useParams()
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [popUpMasuk, setPopUpMasuk] = useState(false);
    const [popUpKeluar, setPopUpKeluar] = useState(false);
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

    console.log(isImgUrl('https://absensiguru.smkrus.com/'))

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
                            <p>{dayjs(detail?.absen?.tanggal_masuk).format('dddd-DD-MMM-YYYY')}, {detail?.absen?.waktu_masuk.slice(0, 5)}</p>
                        </div>

                        <div className='card'>
                            <img className='foto-masuk' src={detail?.absen?.foto_masuk} alt="" onClick={() => setPopUpMasuk(popUpMasuk ? false : true)}/>

                            {
                                popUpMasuk &&
                                <div className={popUpMasuk ? 'pop-up' : ''} onClick={() => setPopUpMasuk(popUpMasuk ? false : true)}>
                                    <img className='img-user' src={detail?.absen?.foto_masuk} alt="" />
                                </div>
                            }

                            <div className='note'>
                                <h3>Note: </h3>
                                <p>{detail?.absen?.catatan_masuk}</p>
                            </div>
                            <div className='coordinates'>
                                <div>
                                    <h3>Lokasi</h3>
                                    <p>{detail?.absen?.lokasi_masuk}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='masuk-keluar'>
                        <div className='jam-masuk'>
                            <h3>Keluar</h3>
                            <p>{dayjs(detail?.absen?.tanggal_pulang).format('dddd-DD-MMM-YYYY')}, {detail?.absen?.waktu_pulang?.slice(0, 5)}</p>
                        </div>

                        <div className='card'>
                            {
                                isImgUrl(detail?.absen?.foto_pulang) ?
                                    <img className='foto-masuk' src={detail?.absen?.foto_pulang} alt="" onClick={() => setPopUpKeluar(popUpKeluar ? false : true)}/>
                                : <div className='default-foto'>Belum Keluar</div>
                            }
                            {
                                popUpKeluar &&
                                <div className={popUpKeluar ? 'pop-up' : ''} onClick={() => setPopUpKeluar(popUpKeluar ? false : true)}>
                                    <img className='img-user' src={detail?.absen?.foto_pulang} alt="" />
                                </div>
                            }
                            <div className='note'>
                                <h3>Note: </h3>
                                <p>{detail?.absen?.catatan_pulang}</p>
                            </div>
                            <div className='coordinates'>
                                <div>
                                    <h3>Lokasi</h3>
                                    <p>{detail?.absen?.lokasi_pulang}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <DetailProfile data={detail}/>
            </div>
        </div>
    )
}

export default Detail