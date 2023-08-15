import React, { useEffect } from 'react'
import BtnDropDown from './BtnDropDown';
import Chart from './Chart';
import { useDispatch, useSelector } from 'react-redux';
import { getStatistik } from '../../features/statistikSlice';

function StatisticChart() {
  const { kategori } = useSelector(state => state.statistik)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getStatistik())
  }, [dispatch])

  return (
    <div className='statistic-chart'>
      <div className='div-1'>
        <p>Absensi {kategori === 'Minggu' ? '7 Hari Terakhir' : '1 tahun terakhir'}</p>
        <BtnDropDown />
      </div>
      <div className='div-2'>
        <Chart />
      </div>
    </div>
  )
}

export default StatisticChart