import React, { useContext, useEffect, useState } from 'react'
import close from '../../assets/icons/close-calendar.svg'
import trash from '../../assets/icons/trash.svg'
import hamburger from '../../assets/icons/hamburger.svg'
import GlobalCalendar from '../../contexts/app/GlobalCalendar'
import calendarIcon from '../../assets/icons/calendar-black.svg'
import { useApiKalender } from '../../contexts/api/kalender/ContextApiKalender'

const labelsClasses = [
    "indigo",
    "gray",
    "green",
    "blue",
    "red",
    "purple",
];

export default function EventModal() {
    const context = useApiKalender()
    const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent, setSelectedEvent } = useContext(GlobalCalendar)
    const [title, setTitle] = useState(selectedEvent ? selectedEvent.judul : '')
    const [description, setDescription] = useState(selectedEvent ? selectedEvent.deskripsi : '')
    const [isLibur, setIsLibur] = useState(selectedEvent ? selectedEvent.is_libur : '0')
    const [untuk, setUntuk] = useState(selectedEvent ? selectedEvent.untuk : null)
    const [selectedLabel, setSelectedLabel] = useState(
        selectedEvent ? labelsClasses.find((lbl) => lbl === selectedEvent.label) : labelsClasses[0]
    )

    function handleSubmit(e) {
        e.preventDefault()
        const calendarEvent = {
            title,
            description,
            label: selectedLabel,
            day: daySelected.valueOf(),
            id: selectedEvent ? selectedEvent.id : Date.now()
        }
        if (selectedEvent) {
            dispatchCalEvent({ type: 'update', payload: calendarEvent })
        } else {
            dispatchCalEvent({ type: 'push', payload: calendarEvent })
        }
        setShowEventModal(false)
    }

    function handleClose(){
        setShowEventModal(false) 
        setSelectedEvent(null)
    }

    function handleRadio(e){
        setUntuk(e.target.value)
        // setIsLibur(e.target.value)
    }

    return (
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center modal">
            <form className="bg-white rounded-lg shadow-2xl w-1/4">
                <header>
                    <h3>
                        Tambah Event
                    </h3>
                    <div className='action'>
                        {selectedEvent && (
                            <img className='trash' onClick={() => {
                                dispatchCalEvent({ type: 'delete', payload: selectedEvent })
                                setShowEventModal(false)
                                setSelectedEvent(null)
                            }}
                                src={trash} />
                        )}
                        <img onClick={handleClose} src={close} />
                    </div>
                </header>
                <div className='wrapper-input'>
                    <input
                        className='kegiatan-input'
                        type='text'
                        name='kegiatan'
                        placeholder='Kegiatan'
                        value={title}
                        required
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <div className='date'>
                        <img src={calendarIcon} />
                        <p>{daySelected.format('dddd, MMMM, DD')}</p>
                    </div>
                    <div className='description'>
                        <img src={hamburger}/>
                        <textarea
                            type='text'
                            name='description'
                            placeholder='Deskripsi (Opsional)'
                            value={description}
                            required
                            onChange={(e) => setDescription(e.target.value)}                        
                        >
                        </textarea>
                    </div>
                    <div className='checkbox-form'>
                        <div className='wrap-for'>
                            <div className='wrap-label-input'>
                                <input type='radio' value='all' id='semua karyawan' name='for' onChange={handleRadio} checked={untuk === 'all' ? true : false}/>
                                <label htmlFor='semua karyawan'>Semua Karyawan</label>
                            </div>

                            <div className='wrap-label-input'>
                                <input type='radio'value='guru' id='Hanya Guru' name='for' onChange={handleRadio} checked={untuk === 'guru' ? true : false}/>
                                <label htmlFor='Hanya Guru'>Hanya Guru</label>
                            </div>

                            <div className='wrap-label-input'>
                                <input type='radio'value='staff' id='Hanya Staff' name='for' onChange={handleRadio} checked={untuk === 'staff' ? true : false}/>
                                <label htmlFor='Hanya Staff'>Hanya Staff</label>
                            </div>
                        </div>

                        <div className='wrap-is-libur'>
                            <div className='wrap-label-input'> 
                                <input type='radio' id='Libur' value='libur' name='is libur' onChange={handleRadio}/>
                                <label htmlFor='Libur'>Libur</label>
                            </div>

                            <div className='wrap-label-input'>
                                <input type='radio' id='Tidak Libur' value='tidak libur' name='is libur' onChange={handleRadio}/>
                                <label htmlFor='Tidak Libur'>Tidak Libur</label>
                            </div>
                        </div>
                    </div>
                    <div className='wrapper-label'>
                        {labelsClasses.map((label, idx) => (
                            <div key={idx} onClick={() => setSelectedLabel(label)} style={{ backgroundColor: label }} className={`label ${label}`}>
                                {selectedLabel === label && (
                                    <img src={close} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <footer>
                    <button type='submit' className='submit' onClick={handleSubmit}>Konfirmasi</button>
                </footer>
            </form>
        </div>
    )
}
