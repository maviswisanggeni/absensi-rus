import React, { useContext, useEffect, useState } from 'react'
import close from '../../assets/icons/close-calendar.svg'
import trash from '../../assets/icons/trashRed.svg'
import hamburger from '../../assets/icons/hamburger.svg'
import GlobalCalendar from '../../contexts/app/GlobalCalendar'
import calendarIcon from '../../assets/icons/calendar-black.svg'
import { useApiKalender } from '../../contexts/api/kalender/ContextApiKalender'
import axios from 'axios'

const labelsClasses = [
    "#21D2FF",
    "#EA4D90",
];

export default function EventModal() {
    const context = useApiKalender()
    const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent, setSelectedEvent } = useContext(GlobalCalendar)
    const [id, setId] = useState(selectedEvent ? selectedEvent.id : '')
    const [judul, setJudul] = useState(selectedEvent ? selectedEvent.judul : '')
    const [description, setDescription] = useState(selectedEvent ? selectedEvent.deskripsi : '')
    const [tanggal, setTanggal] = useState(selectedEvent ? selectedEvent.tanggal : daySelected.format('YYYY-MM-DD'))
    const [untuk, setUntuk] = useState(selectedEvent ? selectedEvent.untuk : null)
    const [isLibur, setIsLibur] = useState(selectedEvent ? selectedEvent.is_libur : null)
    const [selectedLabel, setSelectedLabel] = useState(
        selectedEvent ? labelsClasses.find((lbl) => lbl === selectedEvent.label) : labelsClasses[0]
    )

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append('judul', judul);
    formData.append('deskripsi', description);
    formData.append('tanggal', tanggal);
    formData.append('untuk', untuk);
    formData.append('is_libur', isLibur);
    console.log('day selected ' + daySelected);

    function addEvent(e) {
        e.preventDefault()

        axios({
            method: 'post',
            url: `https://absensiguru.smkrus.com/api/kalender/create`, 
            data: formData,
            headers: { 
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        })
        .then((response) => {
            setShowEventModal(false)
            context.getKalender()
            setSelectedEvent(null)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    function editEvent(e){
        e.preventDefault()
        formData.append('id', id);
        axios({
            method: 'post',
            url: `https://absensiguru.smkrus.com/api/kalender/edit`, 
            data: formData,
            headers: { 
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        })
        .then((response) => {
            setShowEventModal(false)
            context.getKalender()
            setSelectedEvent(null)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    function handleClose(){
        setShowEventModal(false) 
        setSelectedEvent(null)
    }

    function handleDelete(id) {
        axios.get(`https://absensiguru.smkrus.com/api/kalender/destroy/${id}`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then((response) => {
            context.getKalender()
            setShowEventModal(false) 
            setSelectedEvent(null)
        })
        .catch((error) => {
            console.log(error)
         })
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
                            <img className='trash' onClick={() => handleDelete(selectedEvent.id)}src={trash} />
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
                        value={judul}
                        required
                        onChange={(e) => setJudul(e.target.value)}
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
                                <input type='radio' value='all' id='semua karyawan' name='untuk' onChange={(e) => setUntuk(e.target.value)} checked={untuk === 'all' ? true : false}/>
                                <label htmlFor='semua karyawan'>Semua Karyawan</label>
                            </div>

                            <div className='wrap-label-input'>
                                <input type='radio'value='guru' id='Hanya Guru' name='untuk' onChange={(e) => setUntuk(e.target.value)} checked={untuk === 'guru' ? true : false}/>
                                <label htmlFor='Hanya Guru'>Hanya Guru</label>
                            </div>

                            <div className='wrap-label-input'>
                                <input type='radio'value='staff' id='Hanya Staff' name='untuk' onChange={(e) => setUntuk(e.target.value)} checked={untuk === 'staff' ? true : false}/>
                                <label htmlFor='Hanya Staff'>Hanya Staff</label>
                            </div>
                        </div>

                        <div className='wrap-is-libur'>
                            <div className='wrap-label-input'> 
                                <input type='radio' id='Libur' value='0' name='isLibur' onChange={(e) => setIsLibur(e.target.value)} checked={isLibur === '0' ? true : false}/>
                                <label htmlFor='Libur'>Libur</label>
                            </div>

                            <div className='wrap-label-input'>
                                <input type='radio' id='Tidak Libur' value='1' name='isLibur' onChange={(e) => setIsLibur(e.target.value)} checked={isLibur === '1' ? true : false}/>
                                <label htmlFor='Tidak Libur'>Kegiatan</label>
                            </div>
                        </div>
                    </div>
                    {/* <div className='wrapper-label'>
                        {labelsClasses.map((label, idx) => (
                            <div key={idx} onClick={() => setSelectedLabel(label)} style={{ backgroundColor: label }} className={`label ${label}`}>
                                {selectedLabel === label && (
                                    <img src={close} />
                                )}
                            </div>
                        ))}
                    </div> */}
                </div>
                <footer>
                    <button type='submit' className='submit' onClick={selectedEvent ? editEvent : addEvent}>Konfirmasi</button>
                </footer>
            </form>
        </div>
    )
}
