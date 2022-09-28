import React from 'react'
import kalenderIcon from '../../assets/icons/kalender-card.svg'

function CardJadwal(props) {
  return (
    <div className='card-jadwal'>
        <div>
            <h4>{props.title}</h4>
            <img src={kalenderIcon} alt="" />
        </div>
        <p>{props.date}</p>
        <p>Diikuti oleh : <span>{props.status}</span></p>
    </div>
  )
}

export default CardJadwal