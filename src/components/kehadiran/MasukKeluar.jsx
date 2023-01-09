import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { ContextApiKehadiranList, useKehadiranListAbsensi } from '../../contexts/api/ContextApiKehadiranListData'
import people1 from '../../assets/images/user-foto.png'

function MasukKeluar(props) {
    const context = useKehadiranListAbsensi()
    const [detail, setDetail] = useState(null)
    useEffect(() => {
        async function getData() {
            const url = "http://absensiguru.smkradenumarsaidkudus.sch.id/api/kehadiran/detail"
            const request = {
                id: props?.id
            }
            axios.get(url, {params: request}).then((response) => {
                console.log(response.data);
                setDetail(response.data)
            }).catch((error) => {
                console.log(error);
            })
        }
        getData()
    }, [])
  return (
    <div className='masuk-keluar'>
        <div className='jam-masuk'>
            <h3>{props.keterangan}</h3>
            <p>06.18</p>
        </div>

        <div className='card'>
            <img src={detail.data?.pf_foto} alt="" />
            {/* <img src={people1} alt="" /> */}
            <div className='note'>
                <h3>Note: </h3>
                <p>{context.listAbsensi?.data?.data[0]?.catatan}</p>
            </div>
            <div className='coordinates'>
                <div>
                    <h3>Latitude</h3>
                    <p>{context.listAbsensi?.data?.data[0]?.latitude}</p>
                </div>
                <div>
                    <h3>Longitude</h3>
                    <p>{context.listAbsensi?.data?.data[0]?.longitude}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MasukKeluar