import React from 'react'

function Label({ className, label }) {
  return (
    <label htmlFor={className} className={className}>{label}</label>
  )
}

export default Label