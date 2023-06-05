import React, { useEffect } from 'react'
import { useApiDashboardStatistik } from '../../contexts/api/dashboard/ApiDashboardStatistik';
import BtnDropDown from './BtnDropDown';
import Chart from './Chart';
import ChartInfo from './ChartInfo';
import { useDispatch, useSelector } from 'react-redux';
import { getStatistik } from '../../features/statistikSlice';

function StatisticChart() {
  const context = useApiDashboardStatistik()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getStatistik())
  }, [dispatch])

  const { statistikData } = useSelector(state => state.statistik)

  return (
    <div className='statistic-chart'>
      <div className='div-1'>
        <p>Absensi 7 Hari Terakhir</p>
        <BtnDropDown />
      </div>
      <div className='div-2'>
        <Chart data={statistikData.mingguan} />
        <ChartInfo />
      </div>
    </div>
  )
}

export default StatisticChart