import React from 'react'

function Select({data, func, select}) {
  function handleChange(e){
    func(e.target.value)
  }

  return (
    <select onChange={handleChange} value={select}>
        {data.map((item, key) => {
            return (
              <option key={key} value={item.nama}>{item.nama}</option>
            )
        })
        }
    </select>
  )
}

export default Select