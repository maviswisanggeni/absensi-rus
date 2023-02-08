import React from 'react'
import { useApiDashboardStatistik } from '../../contexts/api/dashboard/ApiDashboardStatistik';
import BtnDropDown from './BtnDropDown';
import Chart from './Chart';
import ChartInfo from './ChartInfo';

function StatisticChart() {
  const context = useApiDashboardStatistik()
  return (
    <div className='statistic-chart'>
      <div className='div-1'>
        <p>Absensi 7 Hari Terakhir</p>
        <BtnDropDown />
      </div>
      <div className='div-2'>
        <Chart data={context.data} />
        <ChartInfo />
      </div>
    </div>
  )
}

export default StatisticChart