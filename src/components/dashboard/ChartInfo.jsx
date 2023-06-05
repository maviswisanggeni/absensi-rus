import dayjs from 'dayjs'
import React from 'react'
import { useApiDashboardStatistik } from '../../contexts/api/dashboard/ApiDashboardStatistik'
import ButtonDownload from './ButtonDownload'
import { useSelector } from 'react-redux'

function ChartInfo() {
  const context = useApiDashboardStatistik()

  const { statistikData, loading } = useSelector(state => state.statistik)

  return (
    <div className='chartInfo'>
      <p>
        {loading ?
          statistikData?.mingguan.map((item, i) => (
            <React.Fragment key={i}>
              {i === 0 ? dayjs(item.date).format('DD MMMM YYYY') + ' - ' : ''}
              {statistikData?.mingguan.length - 1 === i ? dayjs(item.date).format('DD MMMM YYYY') : ''}
            </React.Fragment>
          ))
          : <div>-</div>
        }
      </p>

      <div className='role pengajar'>
        <div></div>
        <p>Pengajar</p>
      </div>
      <div className='role staff'>
        <div></div>
        <p>Staff</p>
      </div>
      <ButtonDownload />
    </div>
  )
}

export default ChartInfo