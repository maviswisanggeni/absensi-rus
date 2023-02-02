import React, { useState } from 'react'


function MasukKeluar(props) {
  return (
    <div className='masuk-keluar'>
        <div className='jam-masuk'>
            <h3>{props.keterangan}</h3>
            <p>{props.detailData.waktu_masuk}</p>
        </div>

        <div className='card'>
            <img src={props.detailData.foto_masuk} alt="" />
                <div className='note'>
                <h3>Note: </h3>
                <p>{props.detailData.catatan_masuk}</p>
            </div>
            <div className='coordinates'>
                <div>
                    <h3>Latitude</h3>
                    <p>{props.detailData.longitude_masuk}</p>
                </div>
                <div>
                    <h3>Longitude</h3>
                    <p>{props.detailData.longitude_pulang}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MasukKeluar