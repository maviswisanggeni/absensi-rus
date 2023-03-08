import React from 'react'

function Input({className, type, placeholder, value, func, setValidator}) {
  function handleChange(e){
    func(e.target.value)
  }
  return (
    <input type={type} name={type} id={className} placeholder={placeholder} value={value} onChange={handleChange} onInput={() => setValidator(true)}/>
  )
}

export default Input