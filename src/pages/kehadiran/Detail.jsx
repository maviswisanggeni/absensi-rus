import React, { useState } from 'react'
import arrowLeft from '../../assets/icons/arrow-left.svg'
import DetailProfile from './DetailProfile'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import Sidebar from '../../components/sidebar/Sidebar'
import DetailCard from './DetailCard'
import { useSelector } from 'react-redux'
import pdfIcon from '../../assets/icons/pdf.svg'

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

    const { detailKehadiranIzin } = useSelector(state => state.kehadiran)
    console.log(userId);
    useEffect(() => {
        async function getKehadiranIzin() {
            const url = "https://absensiguru.smkrus.com/api/kehadiran/detail-izin/" + userId.id
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

        async function getKehadiran() {
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


        if (userId.izin) {
            getKehadiranIzin();
        } else {
            getKehadiran();
        }
    }, [userId]);

    function isImgUrl(url) {
        return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url)
    }

    function checkNull(data) {
        return data ? data : '-'
    }
    console.log(detailKehadiranIzin);
    // console.log(detail);

    function isLinkPdfOrImage(link) {
        const pdfExtensions = ['.pdf'];
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'];

        const extension = link.substring(link.lastIndexOf('.')).toLowerCase();

        if (pdfExtensions.includes(extension)) {
            return 'pdf';
        } else if (imageExtensions.includes(extension)) {
            return 'image';
        } else {
            return 'unknown';
        }
    }
    console.log(popUpMasuk);

    return (
        <div className='wrapper-detail'>
            <Sidebar />
            <div className='detail'>
                <div className='navigation'>
                    <img onClick={() => navigate(-1)} src={arrowLeft} alt="" />
                    <h1>Detail Kehadiran</h1>
                </div>

                <div className='main'>
                    {detail?.jenis_izin === undefined ?
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
                                is_valid_wkt={detail?.valid_masuk}
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
                                is_valid_wkt={detail?.valid_pulang}
                                loading={loading}
                                popUp={popUpKeluar}
                                setPopUp={setPopUpKeluar}
                                popUpMap={popUpMapKeluar}
                                setPopUpMap={setPopUpMapKeluar}
                                checkNull={checkNull}
                            />
                        </div>

                        : <div className='detail__izin'>
                            <div className='wrapper__header'>
                                <h1>Izin {detail.jenis_izin} &nbsp;</h1>
                                {/* <p>08:08</p> */}
                            </div>

                            <div className='wrapper__tanggal'>
                                <p>{dayjs(detail.mulai_izin).format('DD MMMM YYYY')}</p>
                                <p>
                                    {dayjs(detail.mulai_izin).format('DD MMMM YYYY') === dayjs(detail.selesai_izin).format('DD MMMM YYYY')
                                        ? null
                                        : ' - ' + dayjs(detail.selesai_izin).format('DD MMMM YYYY')
                                    }
                                </p>
                            </div>

                            <div className='wrapper__file' onClick={() => {
                                isLinkPdfOrImage(detail.link_file) === 'pdf'
                                    ? window.open(detail.link_file, '_blank')
                                    : setPopUpMasuk(true)
                            }}>
                                <img
                                    src={
                                        isLinkPdfOrImage(detail.link_file) === 'image'
                                            ? detail.link_file
                                            : pdfIcon
                                    }
                                    className={isLinkPdfOrImage(detail.link_file) === 'image' ? 'image' : 'pdf'}
                                    alt=""
                                />
                                {isLinkPdfOrImage(detail.link_file) === 'pdf' && <p>{detail.path_file}</p>}
                            </div>

                            {popUpMasuk &&
                                <div className='bg-modal' onClick={() => setPopUpMasuk(false)}>
                                    <img src={detail.link_file} alt="" />
                                </div>
                            }

                            <div className='wrapper__catatan'>
                                <h1>Catatan</h1>
                                <p>{detail.deskripsi ? detail.deskripsi : 'Tidak ada catatan'}</p>
                            </div>
                        </div>
                    }
                    <DetailProfile data={detail} />
                </div>
            </div>
            {!loading ? <div className='loading-fullscreen'><div className='loading'></div></div> : null}
        </div>
    )
}

export default Detail