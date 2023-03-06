import dayjs from 'dayjs'
import React from 'react'
import { useApiDashboardStatistik } from '../../contexts/api/dashboard/ApiDashboardStatistik'
import ButtonDownload from './ButtonDownload'

function ChartInfo() {
  const context = useApiDashboardStatistik()
  return (
    <div className='chartInfo'>
      <p>
        {
          context.data?.map((item, i) => (
            <React.Fragment key={i}>
              {i === 0 ? dayjs(item.date).format('DD MMMM YYYY') + ' - ' : ''}
              {context.data?.length - 1 === i ? dayjs(item.date).format('DD MMMM YYYY') : ''}
            </React.Fragment>
          ))
        }
      </p>

      {/* <div className='role pengajar'>
        <div></div>
        <p>Pengajar</p>
      </div>
      <div className='role staff'>
        <div></div>
        <p>Staff</p>
      </div> */}
      <ButtonDownload />
    </div>
  )
}

export default ChartInfo