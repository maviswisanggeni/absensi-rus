import React from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import LogoSidebar from '../components/sidebar/LogoSidebar';
import imgAlert from '../assets/icons/responsive-alert.svg'
import '../styles/css/responsive-alert.css'

function ResponsiveAlert(props) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    if (windowWidth < 1024) {
        return (
            <div className="responsive-alert">
                <LogoSidebar />
                <h1 className='alert__text'>Ukuran layarmu<br /> harus lebih dari <br /> 1024</h1>
                <img src={imgAlert} alt="" />
                <p>Ukuran saat ini {windowWidth}</p>
            </div>
        )
    } else {
        return props.children
    }
}

export default ResponsiveAlert