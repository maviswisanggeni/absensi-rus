import React from 'react'
import { useContext } from 'react'
import { ContextApiKehadiranList } from '../../contexts/api/ContextApiKehadiranListData'

function MasukKeluar(props) {
    const [listAbsensi] = useContext(ContextApiKehadiranList)
  return (
    <div className='masuk-keluar'>
        <div className='jam-masuk'>
            <h3>{props.keterangan}</h3>
            <p>06.18</p>
        </div>

        <div className='card'>
            <img src={props.img} alt="" />
            <div className='note'>
                <h3>Note: </h3>
                <p>{listAbsensi?.data?.data[0]?.catatan}</p>
            </div>
            <div className='coordinates'>
                <div>
                    <h3>Latitude</h3>
                    <p>{listAbsensi?.data?.data[0]?.latitude}</p>
                </div>
                <div>
                    <h3>Longitude</h3>
                    <p>{listAbsensi?.data?.data[0]?.longitude}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MasukKeluar