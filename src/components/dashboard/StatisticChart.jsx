import React from 'react'
import BtnDropDown from './BtnDropDown';
import Chart from './Chart';
import ChartInfo from './ChartInfo';

function StatisticChart() {
  return (
    <div className='statistic-chart'>
        <div className='div-1'>
            <p>Absensi 7 Hari Terakhir</p>
            <BtnDropDown/>  
        </div>
        <div className='div-2'>
          <Chart/>  
          <ChartInfo/>
        </div>
    </div>
  )
}

export default StatisticChart