import React, { useState, useEffect } from 'react';

const NoInternetConnection = (props) => {
    const [isOnline, setOnline] = useState(true);

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
        return (<h1>No Interner Connection. Please try again later.</h1>)
    }
}

export default NoInternetConnection;