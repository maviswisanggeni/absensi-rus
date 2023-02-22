import React, { useContext, useState } from 'react'
import close from '../../assets/icons/close.svg'
import trash from '../../assets/icons/trash.svg'
import GlobalCalendar from '../../contexts/app/GlobalCalendar'
import calendarIcon from '../../assets/icons/kalender-card.svg'

const labelsClasses = [
    "indigo",
    "gray",
    "green",
    "blue",
    "red",
    "purple",
];

export default function EventModal() {
    const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } = useContext(GlobalCalendar)

    const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '')
    const [description, setDescription] = useState(selectedEvent ? selectedEvent.description : '')
    const [selectedLabel, setSelectedLabel] = useState(
        selectedEvent ? labelsClasses.find((lbl) => lbl === selectedEvent.label) : labelsClasses[0]
    )

    function handleSubmit(e){
        e.preventDefault()
        const calendarEvent = {
            title,
            description,
            label: selectedLabel,
            day: daySelected.valueOf(),
            id: selectedEvent ? selectedEvent.id : Date.now()
        }
        if(selectedEvent){
            dispatchCalEvent({type: 'update', payload: calendarEvent})
        }else{
            dispatchCalEvent({type: 'push', payload: calendarEvent})
        }
        setShowEventModal(false)
    }

    return (
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center modal">
            <form className="bg-white rounded-lg shadow-2xl w-1/4">
                <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
                    <span className="text-gray-400 drag">
                        Tambah Event
                    </span>
                    <div>
                        {selectedEvent && (
                        <button 
                        onClick={() => {
                            dispatchCalEvent({type: 'delete', payload: selectedEvent})
                            setShowEventModal(false)
                        }}>
                            <img src={trash}/>
                        </button>                            
                        )}
                        <button onClick={() => setShowEventModal(false)}>
                            <img src={close}/>
                        </button>
                    </div>
                </header>
                <div>
                    <div>
                        <div></div>
                        <input 
                            type='text' 
                            name='title' 
                            placeholder='add title' 
                            value={title} 
                            required
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <img src={calendarIcon}/>
                        <p>{daySelected.format('dddd, MMMM, DD')}</p>
                        <input 
                            type='text' 
                            name='description' 
                            placeholder='add description' 
                            value={description} 
                            required
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <div className='wrapper-label'>
                            {labelsClasses.map((label, idx) => (
                                <div key={idx} onClick={() => setSelectedLabel(label)} style={{backgroundColor: label}} className={`label ${label}`}>
                                    {selectedLabel === label && (
                                        <img src={close}/>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <footer>
                    <button type='submit' onClick={handleSubmit}>Save</button>
                </footer>
            </form>
        </div>
    )
}
