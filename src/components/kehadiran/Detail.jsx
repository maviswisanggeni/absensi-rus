import React, { useState } from 'react'
import arrowLeft from '../../assets/icons/arrow-left.svg'
import MasukKeluar from './MasukKeluar'
import DetailProfile from './DetailProfile'
import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'

function Detail() {
    let userId = useParams()
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");
    useEffect(() => {
        async function getData() {
            const url = "http://127.0.0.1:8000/api/kehadiran/detail/" + userId.id
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
    }, [userId]);

    return (
        <div className='detail'>
            <div className='navigation'>
                <Link to={'/kehadiran'}>
                    <img src={arrowLeft} alt="" />
                </Link>
                <h1>Detail User</h1>
            </div>
            <div className='main'>
                <div className='detail-masuk-keluar'>
                    {/* <MasukKeluar detailData={detail} keterangan="Masuk" img={people1}/> */}
                    {/* <MasukKeluar id={context.listAbsensi?.data?.data[0]?.id} keterangan="Keluar" img={people2}/> */}
                    <div className='masuk-keluar'>
                        <div className='jam-masuk'>
                            <h3>Masuk</h3>
                            <p>{detail?.waktu_masuk}</p>
                        </div>

                        <div className='card'>
                            <img src={detail?.foto_masuk} alt="" />
                            <div className='note'>
                                <h3>Note: </h3>
                                <p>{detail?.catatan_masuk}</p>
                            </div>
                            <div className='coordinates'>
                                <div>
                                    <h3>Latitude</h3>
                                    <p>{detail?.longitude_masuk}</p>
                                </div>
                                <div>
                                    <h3>Longitude</h3>
                                    <p>{detail?.longitude_pulang}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='masuk-keluar'>
                        <div className='jam-masuk'>
                            <h3>Keluar</h3>
                            <p>{detail?.waktu_pulang}</p>
                        </div>

                        <div className='card'>
                            <img src={detail?.foto_pulang} alt="" />
                            <div className='note'>
                                <h3>Note: </h3>
                                <p>{detail?.catatan_pulang}</p>
                            </div>
                            <div className='coordinates'>
                                <div>
                                    <h3>Latitude</h3>
                                    <p>{detail?.longitude_masuk}</p>
                                </div>
                                <div>
                                    <h3>Longitude</h3>
                                    <p>{detail?.longitude_pulang}</p>
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