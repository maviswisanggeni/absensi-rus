import React from 'react'

function AlertModal({ heading, message, onCancel, onConfirm }) {
    return (
        <>
            <div className='bg-modal'>
                <div className='alert-modal'>
                    <h1>{heading}</h1>
                    <p>{message}</p>
                    <div>
                        <button onClick={onCancel}>Tidak</button>
                        <button onClick={onConfirm}>Iya</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AlertModal