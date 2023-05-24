import React from 'react'
import '../styles/css/App.css'

function Button({ text, onClick, className, type, disabled, style }) {
    return (
        <button onClick={onClick} className={className + ' button-blue'} type={type} disabled={disabled} style={style}>{text}</button>
    )
}

export default Button