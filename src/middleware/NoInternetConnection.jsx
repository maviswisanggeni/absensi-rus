import React, { useState, useEffect } from 'react';
import disconnectImg from '../assets/icons/disconnect.svg';
import '../styles/css/no-internet.css'
import Button from '../components/Button';
import Sidebar from '../components/sidebar/Sidebar';

const NoInternetConnection = (props) => {
    const [isOnline, setOnline] = useState(false);

    useEffect(() => {
        setOnline(navigator.onLine)
    }, [])

    window.addEventListener('online', () => {
        setOnline(true)
    });

    window.addEventListener('offline', () => {
        setOnline(false)
    });

    if (isOnline) {
        return (
            props.children
        )
    } else {
        function handleClick() {
            window.location.reload()
        }
        return (
            <div className='no-internet'>
                <Sidebar />
                <div className='content'>
                    <img src={disconnectImg} alt="" />
                    <h1>Sambungkan Ke Internet</h1>
                    <p>Anda sedang offline. Periksa koneksi Anda.</p>
                    <Button onClick={handleClick} text='Coba lagi' />
                </div>
            </div>
        )
    }
}

export default NoInternetConnection;