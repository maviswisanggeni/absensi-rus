import React, { useContext, useEffect, useState } from 'react'
import dayjs from "dayjs";
import GlobalCalendar from '../../contexts/app/GlobalCalendar';
import { useApiKalender } from '../../contexts/api/kalender/ContextApiKalender';
import { useRef } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { updateFieldKalender } from '../../features/kalenderSlice';

export default function Day({ day, rowIdx }) {

    const [dayEvents, setDayEvents] = useState([])
    const { setDaySelected, setShowEventModal, savedEvents, setSelectedEvent, selectedEvent, monthIndex, daySelected } = useContext(GlobalCalendar)
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const targetRef = useRef(null);
    const modalRef = useRef(null);
    const [modalActive, setModalActive] = useState(null)
    const navigate = useNavigate()
    const context = useApiKalender()
    const { listEvent, loading } = useSelector((state) => state.kalender)
    const dispatch = useDispatch()

    useEffect(() => {
        const events = listEvent.filter(evt => dayjs(evt.waktu_mulai).format("DD-MM-YY") === day.format("DD-MM-YY"))
        setDayEvents(events)
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

    useEffect(() => {
        const calculateModalPosition = () => {
            const targetElement = targetRef.current;
            const modalElement = modalRef.current;

            if (targetElement && modalElement) {
                const targetRect = targetElement.getBoundingClientRect();
                const modalRect = modalElement.getBoundingClientRect();

                let modalTop, modalLeft;

                if (rowIdx === 0) {
                    modalTop = targetRect.bottom + window.pageYOffset;
                    modalLeft = targetRect.left;
                } else {
                    modalTop = targetRect.top - modalRect.height - window.pageYOffset;
                    modalLeft = targetRect.left;
                }

                setModalPosition({ top: modalTop, left: 1000 });
            }
        };

        calculateModalPosition();

        // Recalculate the modal position when the window is resized
        window.addEventListener('resize', calculateModalPosition);

        return () => {
            // Clean up the event listener on component unmount
            window.removeEventListener('resize', calculateModalPosition);
        };
    }, []);

    function handleAddClick() {
        if (dayEvents.length === 0) {
            setDaySelected(day);
            dispatch(updateFieldKalender({ name: 'daySelected', value: day.format('D MMMM YYYY') }))
            navigate(`/kalender/add/${day.format('D MMMM YYYY')}/`);
        }
    }

    function handleEventClick(evt) {
        setSelectedEvent(evt)
        dispatch(updateFieldKalender({ name: 'daySelected', value: day.format('D MMMM YYYY') }))
        navigate(`/kalender/add/${day.format('D MMMM YYYY')}/${evt.id}`)
    }

    return (
        <div className='day'>
            <header>
                <p className={'dd ' + getCurrentDayClass()}>{day.format('DD')}</p>
            </header>
            <div className={`handle-add`} ref={targetRef} onClick={handleAddClick}>
                {dayEvents.map((evt, idx) => (
                    <>
                        <div key={idx} className='day-events'
                            onClick={() => handleEventClick(evt)}
                            onMouseLeave={() => handleMouseLeave()}
                            onMouseOver={() => handleDetailHover(idx)}
                        >
                            <p style={{ color: evt?.kategori_event === 'event' ? "#21D2FF" : '#EA4D90' }}>
                                {loading ? 'Loading...' : evt.judul}
                            </p>
                            <span>{loading ? '' : 'Lokasi: ' + evt.lokasi}</span>
                        </div>
                        {modalActive === idx ?
                            <div
                                ref={modalRef}
                                className='hover-detail-event'
                                onMouseLeave={() => setModalActive(null)}
                                onMouseOver={() => setModalActive(idx)}
                                key={idx + 1}
                            // style={{ top: modalPosition.top, left: modalPosition.left }}
                            >
                                <div className='wrapper-judul'>
                                    <h1 style={{ color: evt?.kategori_event === 'event' ? "#21D2FF" : '#EA4D90' }}>{evt.judul}</h1>
                                    <h2>Edit</h2>
                                </div>
                                <p className='tanggal'>
                                    {dayjs(evt.waktu_mulai).format('DD MMMM YYYY')}
                                    <p className='jam'>{dayjs(evt.waktu_mulai).format('HH - HH')}</p>
                                </p>
                                <span className='lokasi'>Lokasi: {evt.lokasi}</span>
                                <p className='deskripsi'>{evt.deskripsi}</p>
                            </div> : null}
                    </>
                ))}
            </div>
        </div>
    )
}
