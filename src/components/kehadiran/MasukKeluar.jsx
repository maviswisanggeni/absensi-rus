import React from 'react'


function MasukKeluar(props) {
  return (
    <div className='masuk-keluar'>
        <div className='jam-masuk'>
            <h3>Masuk</h3>
                <p>06.18</p>
        </div>

        <div className='card'>
            <img src={props.img} alt="" />
            <div className='note'>
                <h3>Note: </h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea impedit quis vitae itaque placeat harum?</p>
            </div>
            <div className='coordinates'>
                <div>
                    <h3>Latitude</h3>
                    <p>-6.752518</p>
                </div>
                <div>
                    <h3>Longitude</h3>
                    <p>110.843361</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MasukKeluar