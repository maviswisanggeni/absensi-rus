import React, { useState } from 'react'
import checkIcon from '../assets/icons/check.svg'
import failedIcon from '../assets/icons/failed.svg'
import closeIcon from '../assets/icons/close-calendar.svg'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function InfoBox({ status, message, isDisplay, setIsDisplay, stateName }) {
    const dispatch = useDispatch()

    useEffect(() => {
        if (isDisplay) {
            const timer = setTimeout(() => {
                dispatch(setIsDisplay({ name: stateName, value: false }));
            }, 30000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [isDisplay, dispatch, stateName]);

    const handleClose = () => {
        dispatch(setIsDisplay({ name: stateName, value: false }));
    };
    return (
        <>
            {isDisplay &&
                <div
                    className='info__box'
                    style={status === 'success' ? { backgroundColor: '#04d57d' } : { backgroundColor: '#ff4530' }}
                >
                    <img src={status === 'success' ? checkIcon : failedIcon} alt="" />
                    <h3>{message}</h3>
                    <img src={closeIcon} alt="" onClick={handleClose} />
                </div>}
        </>
    )
}

export default InfoBox