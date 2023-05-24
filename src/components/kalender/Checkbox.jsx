import React from 'react'
import '../../styles/css/App.css'

function Checkbox({ control }) {
    return (
        <input
            type='checkbox'
            className='custom-checkbox'
            id={control}
        />
    )
}

export default Checkbox