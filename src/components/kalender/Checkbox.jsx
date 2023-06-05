import React from 'react'
import '../../styles/css/App.css'

function Checkbox({ control, onChange, name, checked }) {
    return (
        <input
            type='checkbox'
            className='custom-checkbox'
            id={control}
            onChange={() => onChange(control)}
            name={name}
            checked={checked}
        />
    )
}

export default Checkbox