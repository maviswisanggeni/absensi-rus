import React, { useState } from 'react'
import arrowLeft from '../../assets/icons/arrow-left.svg'
import DetailProfile from './DetailProfile'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import Sidebar from '../../components/sidebar/Sidebar'
import DetailCard from './DetailCard'

function Detail() {
    let userId = useParams()
    const navigate = useNavigate()
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

    function checkNull(data) {
        return data ? data : '-'
    }

    return (
        <div className='wrapper-detail'>
            <Sidebar />
            <div className='detail'>
                <div className='navigation'>
                    <img onClick={() => navigate(-1)} src={arrowLeft} alt="" />
                    <h1>Detail Kehadiran</h1>
                </div>

                <div className='main'>
                    <div className='detail-masuk-keluar'>
                        <DetailCard
                            type='Masuk'
                            tanggal={detail?.tanggal_masuk}
                            waktu={detail?.waktu_masuk}
                            link_foto={detail?.link_foto_masuk}
                            catatan={detail?.catatan_masuk}
                            lokasi={detail?.lokasi_masuk}
                            latitude={detail?.latitude_masuk}
                            longitude={detail?.longitude_masuk}
                            is_valid={detail?.is_valid_masuk}
                            loading={loading}
                            popUp={popUpMasuk}
                            setPopUp={setPopUpMasuk}
                            popUpMap={popUpMapMasuk}
                            setPopUpMap={setPopUpMapMasuk}
                            checkNull={checkNull}
                        />

                        <DetailCard
                            type='Keluar'
                            tanggal={detail?.tanggal_pulang}
                            waktu={detail?.waktu_pulang}
                            link_foto={detail?.link_foto_pulang}
                            catatan={detail?.catatan_pulang}
                            lokasi={detail?.lokasi_pulang}
                            latitude={detail?.latitude_pulang}
                            longitude={detail?.longitude_pulang}
                            is_valid={detail?.is_valid_pulang}
                            loading={loading}
                            popUp={popUpKeluar}
                            setPopUp={setPopUpKeluar}
                            popUpMap={popUpMapKeluar}
                            setPopUpMap={setPopUpMapKeluar}
                            checkNull={checkNull}
                        />
                    </div>
                    <DetailProfile data={detail} />
                </div>
            </div>
            {!loading ? <div className='loading-fullscreen'><div className='loading'></div></div> : null}
        </div>
    )
}

export default Detail