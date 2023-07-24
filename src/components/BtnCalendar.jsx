import dayjs from 'dayjs'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { Calendar } from 'react-calendar'
import { useDispatch } from 'react-redux'

function BtnCalendar({ value, stateName, setState, setIsFormEditted, copyForm }) {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const ref = useRef()

    function handleChange(value) {
        dispatch(setState({
            name: stateName,
            value: `${dayjs(value).format('YYYY-MM-DD')}`
        }));

        if (copyForm[stateName] !== dayjs(value).format('YYYY-MM-DD')) {
            dispatch(setIsFormEditted({
                name: 'isFormEditted',
                value: true
            }))
        } else {
            dispatch(setIsFormEditted({
                name: 'isFormEditted',
                value: false
            }))
        }
    }

    function handleClick() {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                ref.current
                && !ref.current.contains(event.target)
                && !event.target.classList.contains('react-calendar__tile')
                && event.target.tagName !== "ABBR"
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [])

    return (
        <div className={`waktu ${isOpen ? 'active' : ''}`} ref={ref}>
            <div className='wrap__text' onClick={handleClick}>
                <div>
                    {dayjs(value).format('DD MMMM YYYY')}
                </div>
                <div className={`arrow__down ${isOpen ? 'active' : ''}`}></div>

            </div>
            {isOpen &&
                <Calendar
                    onChange={handleChange}
                    value={new Date(value)}
                />
            }
        </div>
    )
}

export default BtnCalendar