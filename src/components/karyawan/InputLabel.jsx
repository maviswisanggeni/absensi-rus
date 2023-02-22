import React from 'react'

function InputLabel({className, label, type, placeholder, img, isImg}) {
    return (
        <div className={className}>
            <label htmlFor={className}>{label}</label>
            <input type={type} id={className} placeholder={placeholder} />
            {isImg && <img src={img} />}
        </div>
    )
}

export default InputLabel