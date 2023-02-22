import React from 'react'

function Input({className, type, placeholder, value, func}) {
  function handleChange(e){
    func(e.target.value)
  }
  return (
    <input type={type} id={className} placeholder={placeholder} value={value} onChange={handleChange}/>
  )
}

export default Input