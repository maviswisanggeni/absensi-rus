import React from 'react'

function Label({className, label}) {
  return (
    <label htmlFor={className}>{label}</label>
)
}

export default Label