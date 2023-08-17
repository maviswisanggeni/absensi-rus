import React, { useState } from 'react'
import arrowLeft from '../../assets/icons/arrow-left.svg'
import DetailProfile from '../../components/kehadiran/DetailProfile'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import dayjs from 'dayjs'
import Sidebar from '../../components/sidebar/Sidebar'
import DetailCard from '../../components/kehadiran/DetailCard'
import pdfIcon from '../../assets/icons/pdf.svg'
import { useDispatch, useSelector } from 'react-redux'
import { getDetailIzinKehadiran, getDetailKehadiran, resetDetail, updateStateDetailKehadiran } from '../../features/kehadiranDetailSlice'
import LoadingFullscreen from '../../components/LoadingFullscreen'
import InfoBox from '../../components/InfoBox'
import { goBack } from '../../utils/goBack'
import { getKoordinat } from '../../features/koordinatSlice'

function Detail() {
    let userId = useParams()
    const dispatch = useDispatch()

    const [popUpMasuk, setPopUpMasuk] = useState(false);
    const [popUpKeluar, setPopUpKeluar] = useState(false);
    const [popUpMapMasuk, setPopUpMapMasuk] = useState(false);
    const [popUpMapKeluar, setPopUpMapKeluar] = useState(false);
    const { loading, detailData, statusResApi, messageResApi, isDisplayMessage } = useSelector(State => State.kehadiranDetail)

    useEffect(() => {
        dispatch(resetDetail())
        dispatch(getKoordinat())
    }, [])

    useEffect(() => {
        if (userId.izin) {
            dispatch(getDetailIzinKehadiran(userId.id))
        } else {
            dispatch(getDetailKehadiran(userId.id))
        }
    }, [userId]);

    function checkNull(data) {
        return data ? data : '-'
    }

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

    return (
        <div className='wrapper-detail'>
            <Sidebar />
            <div className='detail'>
                <div className='navigation'>
                    <img onClick={goBack} src={arrowLeft} alt="" />
                    <h1>Detail Kehadiran</h1>
                </div>

                <div className='main'>
                    {detailData?.jenis_izin === undefined &&
                        <div className='detail-masuk-keluar'>
                            <DetailCard
                                type='Masuk'
                                tanggal={detailData?.tanggal_masuk}
                                waktu={detailData?.waktu_masuk}
                                link_foto={detailData?.link_foto_masuk}
                                catatan={detailData?.catatan_masuk}
                                lokasi={detailData?.lokasi_masuk}
                                latitude={detailData?.latitude_masuk}
                                longitude={detailData?.longitude_masuk}
                                is_valid={detailData?.is_valid_masuk}
                                is_valid_wkt={detailData?.valid_masuk}
                                loading={loading}
                                popUp={popUpMasuk}
                                setPopUp={setPopUpMasuk}
                                popUpMap={popUpMapMasuk}
                                setPopUpMap={setPopUpMapMasuk}
                                checkNull={checkNull}
                                keterangan={detailData?.keterangan}
                            />

                            <DetailCard
                                type='Keluar'
                                tanggal={detailData?.tanggal_pulang}
                                waktu={detailData?.waktu_pulang}
                                link_foto={detailData?.link_foto_pulang}
                                catatan={detailData?.catatan_pulang}
                                lokasi={detailData?.lokasi_pulang}
                                latitude={detailData?.latitude_pulang}
                                longitude={detailData?.longitude_pulang}
                                is_valid={detailData?.is_valid_pulang}
                                is_valid_wkt={detailData?.valid_pulang}
                                loading={loading}
                                popUp={popUpKeluar}
                                setPopUp={setPopUpKeluar}
                                popUpMap={popUpMapKeluar}
                                setPopUpMap={setPopUpMapKeluar}
                                checkNull={checkNull}
                                keterangan={detailData?.keterangan}
                            />
                        </div>
                    }

                    {detailData?.jenis_izin !== undefined &&
                        <div className='detail__izin'>
                            <div className='wrapper__header'>
                                <h1>Izin {detailData.jenis_izin} &nbsp;</h1>
                            </div>

                            <div className='wrapper__tanggal'>
                                <p>{dayjs(detailData.mulai_izin).format('DD MMMM YYYY')}</p>
                                <p>
                                    {dayjs(detailData.mulai_izin).format('DD MMMM YYYY') === dayjs(detailData.selesai_izin).format('DD MMMM YYYY')
                                        ? null
                                        : ' - ' + dayjs(detailData.selesai_izin).format('DD MMMM YYYY')
                                    }
                                </p>
                            </div>

                            <div className='wrapper__file' onClick={() => {
                                isLinkPdfOrImage(detailData.link_file) === 'pdf'
                                    ? window.open(detailData.link_file, '_blank')
                                    : setPopUpMasuk(true)
                            }}>
                                <img
                                    src={
                                        isLinkPdfOrImage(detailData.link_file) === 'image'
                                            ? detailData.link_file
                                            : pdfIcon
                                    }
                                    className={isLinkPdfOrImage(detailData.link_file) === 'image' ? 'image' : 'pdf'}
                                    alt=""
                                />
                                {isLinkPdfOrImage(detailData.link_file) === 'pdf' && <p>{detailData.file_name}</p>}
                            </div>

                            {popUpMasuk &&
                                <div className='bg-modal' onClick={() => setPopUpMasuk(false)}>
                                    <img src={detailData.link_file} alt="" />
                                </div>
                            }

                            <div className='wrapper__catatan'>
                                <h1>Catatan</h1>
                                <p>{detailData.deskripsi ? detailData.deskripsi : 'Tidak ada catatan'}</p>
                            </div>
                        </div>
                    }

                    <DetailProfile data={detailData} />
                </div>
            </div>
            <LoadingFullscreen loading={loading} />
            <InfoBox
                isDisplay={isDisplayMessage}
                message={messageResApi}
                status={statusResApi}
                setIsDisplay={updateStateDetailKehadiran}
                stateName={'isDisplayMessage'}
            />
        </div>
    )
}

export default Detail