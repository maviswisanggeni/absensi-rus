import dayjs from 'dayjs'
import React, { useEffect, useRef, useState } from 'react'
import Map from './Map'
import map from '../../assets/images/map.png'
import folderImg from '../../assets/icons/folder.svg'
import 'dayjs/locale/id'

function DetailCard({
    type, tanggal, waktu, link_foto, catatan, lokasi, latitude, longitude,
    is_valid, is_valid_wkt, loading, popUp, setPopUp, popUpMap, setPopUpMap, checkNull, keterangan
}) {

    const wrapperRef = useRef(null);
    const [imgLoaded, setImgLoaded] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                console.log('Click outside detected');
                setPopUpMap(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [setPopUpMap]);

    useEffect(() => {
        dayjs.locale('id')
    }, [])

    return (
        <div className='masuk-keluar'>
            <div className='jam-masuk'>
                <h3>{type}</h3>
                <p>
                    {tanggal
                        ? dayjs(tanggal).format('dddd, DD MMMM YYYY') + ', pukul'
                        : '-'
                    }
                    <span className={is_valid_wkt === '1' ? 'valid-masuk-text' : 'valid-pulang-text'}>
                        {waktu
                            ? ` ${waktu.slice(0, 5)}`
                            : ''
                        }
                    </span>
                </p>
            </div>

            <div className='card'>
                <div className='wrapper-img'>
                    <img className='check-img' src={link_foto} onLoad={() => setImgLoaded(true)} />
                    {imgLoaded || !link_foto ?
                        <>
                            <img
                                className={`${is_valid ? '' : 'foto-belum-keluar'} foto-masuk`}
                                src={is_valid ? link_foto : folderImg}
                                alt=""
                                onClick={() => setPopUp(popUp ? false : true)}
                            />
                            {!is_valid ? <p>Belum Absen Keluar</p> : null}
                        </>
                        : <div className={`foto-masuk skeleton__loading`}></div>
                    }
                </div>
                {popUp && is_valid &&
                    <div className={popUp ? 'pop-up' : ''} onClick={() => setPopUp(popUp ? false : true)}>
                        <img className='img-user' src={link_foto} alt="" loading='loading' />
                    </div>
                }

                <div className='note'>
                    <h3>Note:</h3>
                    <p>{checkNull(catatan)}</p>
                </div>
                <div className='coordinates'>
                    <div className='location'>
                        <h3>Lokasi</h3>
                        <p>{checkNull(lokasi)}</p>
                    </div>
                    <div className='map-and-status'>
                        {popUpMap && latitude && longitude &&
                            <>
                                {popUpMap && latitude && longitude && (
                                    <div className='map-overlay'>
                                        <div className='map-image' ref={wrapperRef}>
                                            <Map latitude={latitude} longitude={longitude} loading={loading} />
                                        </div>
                                    </div>
                                )}
                            </>
                        }
                        <img
                            className='mape'
                            src={map}
                            onClick={(event) => {
                                event.stopPropagation();
                                setPopUpMap(true);
                            }}
                        />                        <div className='wrapper-status'>
                            <div
                                className={`valid-masuk-pulang 
                                    ${is_valid === '1' ? 'valid-masuk' : is_valid === null ? '' : 'valid-pulang'}
                                `}
                            >
                            </div>
                            <p
                                className='status'
                            >
                                {checkNull(is_valid) === '-' ? '-' : is_valid === '1' ? 'Di dalam radius' : 'Di luar radius'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DetailCard