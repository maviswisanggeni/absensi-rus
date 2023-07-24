import React, { useContext, useEffect, useState } from 'react'
import dayjs from "dayjs";
import GlobalCalendar from '../../contexts/app/GlobalCalendar';
import { useApiKalender } from '../../contexts/api/kalender/ContextApiKalender';
import { useRef } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { updateFieldKalender } from '../../features/kalenderSlice';
import 'dayjs/locale/id'

export default function Day({ day, rowIdx }) {

    const [dayEvents, setDayEvents] = useState([])
    const { setDaySelected, setShowEventModal, savedEvents, setSelectedEvent, selectedEvent, monthIndex, daySelected } = useContext(GlobalCalendar)
    const modalRef = useRef(null)
    const [modalActive, setModalActive] = useState(null)
    const navigate = useNavigate()
    const context = useApiKalender()
    const { listEvent, loading } = useSelector((state) => state.kalender)
    const dispatch = useDispatch()

    useEffect(() => {
        const events = listEvent.filter(evt => dayjs(evt.waktu_mulai).format("DD-MM-YY") === day.format("DD-MM-YY"))
        setDayEvents(events)
        dayjs.locale('id')
    }, [savedEvents, day, loading, listEvent])

    function getCurrentDayClass() {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
            ? 'currentDay'
            : "";
    }

    function handleMouseLeave() {
        setModalActive(null)
    }

    function handleDetailHover(idx) {
        setModalActive(idx);
    }

    function handleAddClick() {
        console.log('ini namabh add');
        setDaySelected(day);
        dispatch(updateFieldKalender({ name: 'daySelected', value: day.format('D MMMM YYYY') }))
        navigate(`/kalender/add/${day.format('D MMMM YYYY')}/`);
    }

    function handleEventClick(event, evt) {
        console.log('ini event');
        event.stopPropagation();
        setSelectedEvent(evt)
        dispatch(updateFieldKalender({ name: 'daySelected', value: day.format('D MMMM YYYY') }))
        navigate(`/kalender/add/${day.format('D MMMM YYYY')}/${evt.id}`)
    }

    return (
        <div className='day'>
            <header>
                <p className={'dd ' + getCurrentDayClass()}>{day.format('DD')}</p>
            </header>
            <div className={`handle-add`} onClick={handleAddClick}>
                {dayEvents.map((evt, idx) => (
                    <React.Fragment key={idx}>
                        <div className='day-events'
                            onMouseLeave={() => handleMouseLeave()}
                            onMouseOver={() => handleDetailHover(idx)}
                        >
                            <p style={{ color: evt?.kategori_event === 'event' ? "#21D2FF" : '#EA4D90' }}>
                                {loading ? 'Loading...' : evt.judul}
                            </p>
                            {evt?.kategori_event === 'event' ?
                                <span>{loading ? '' : 'Lokasi: ' + evt.lokasi}</span>
                                : null
                            }
                        </div>
                        <div className='wrapper-modal'>
                            {modalActive === idx ?
                                <div
                                    ref={modalRef}
                                    className='hover-detail-event'
                                    onMouseLeave={() => setModalActive(null)}
                                    onMouseOver={() => setModalActive(idx)}
                                    onClick={(e) => e.stopPropagation()}
                                    key={idx + 1}
                                    style={
                                        day.format('dddd') === 'Jumat' || day.format('dddd') === 'Sabtu' || day.format('dddd') === 'Kamis' ?
                                            { left: -395 }
                                            : null
                                    }
                                >
                                    <div className='wrapper-judul'>
                                        <h1 style={{ color: evt?.kategori_event === 'event' ? "#21D2FF" : '#EA4D90' }}>{evt.judul}</h1>
                                        <h2 onClick={(event) => handleEventClick(event, evt)}>Edit</h2>
                                    </div>
                                    <p className='tanggal'>
                                        {evt?.kategori_event === 'event'
                                            ? <>
                                                {dayjs(evt.waktu_mulai).format('DD MMMM YYYY') === dayjs(evt.waktu_selesai).format('DD MMMM YYYY') ? dayjs(evt.waktu_mulai).format('DD MMMM YYYY')
                                                    : dayjs(evt.waktu_mulai).format('DD MMMM YYYY') + ' - ' + dayjs(evt.waktu_selesai).format('DD MMMM YYYY')
                                                }
                                                <p className='jam'>{dayjs(evt.waktu_mulai).format('HH:mm') + ' - ' + dayjs(evt.waktu_selesai).format('HH:mm')}</p>
                                            </>
                                            : <>
                                                {dayjs(evt.waktu_mulai).format('DD MMMM YYYY') !== dayjs(evt.waktu_selesai).format('DD MMMM YYYY')
                                                    ? <>
                                                        {dayjs(evt.waktu_mulai).format('DD MMMM YYYY')}
                                                        &nbsp; - &nbsp;
                                                        {dayjs(evt.waktu_selesai).format('DD MMMM YYYY')}
                                                    </>
                                                    : dayjs(evt.waktu_mulai).format('DD MMMM YYYY')

                                                }
                                            </>
                                        }
                                    </p>

                                    {evt?.kategori_event === 'event' &&
                                        <span className='lokasi'>
                                            Lokasi: {evt.lokasi}
                                        </span>

                                    }
                                    <p className='deskripsi'>{evt.deskripsi}</p>
                                </div>
                                : null}
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}
