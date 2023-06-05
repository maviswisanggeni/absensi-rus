import dayjs from 'dayjs'
import React from 'react'
import Map from './Map'
import map from '../../assets/images/map.png'
import close from '../../assets/icons/close.svg'
import folderImg from '../../assets/icons/folder.svg'

function DetailCard({
    type, tanggal, waktu, link_foto, catatan, lokasi, latitude, longitude,
    is_valid, loading, popUp, setPopUp, popUpMap, setPopUpMap, checkNull }) {
    return (
        <div className='masuk-keluar'>
            <div className='jam-masuk'>
                <h3>{type}</h3>
                <p>
                    {tanggal
                        ? dayjs(tanggal).format('dddd DD MMM YYYY') + ', '
                        : '-'
                    }
                    {waktu
                        ? waktu.slice(0, 5)
                        : ''
                    }
                </p>
            </div>

            <div className='card'>
                <div className='wrapper-img'>
                    {loading ?
                        <img
                            className={`${link_foto ? '' : 'foto-belum-keluar'} foto-masuk`}
                            src={link_foto ? link_foto : folderImg}
                            alt=""
                            onClick={() => setPopUp(popUp ? false : true)}
                        />
                        : <div className={`foto-masuk ${loading && 'shimmer'}`}></div>
                    }
                    {!link_foto ? <p>Belum Absen Keluar</p> : null}
                </div>
                {popUp && link_foto &&
                    <div className={popUp ? 'pop-up' : ''} onClick={() => setPopUp(popUp ? false : true)}>
                        <img className='img-user' src={link_foto} alt="" />
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
                        {popUpMap &&
                            <>
                                <Map latitude={latitude} longitude={longitude} loading={loading} />
                                <div className='wrapper-close'>
                                    <img src={close} className='close' onClick={() => setPopUpMap(popUpMap ? false : true)} />
                                </div>
                            </>
                        }
                        <img className='mape' src={map} onClick={() => setPopUpMap(popUpMap ? false : true)} />
                        <div className='wrapper-status'>
                            <div className={`valid-masuk-pulang ${is_valid === '1' ? 'valid-masuk' : 'valid-pulang'}`}></div>
                            <p className='status'>{checkNull(is_valid === '1' ? 'Di dalam sekolah' : 'Di luar sekolah')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailCard