import dayjs from 'dayjs'
import React from 'react'
import { useApiDashboardStatistik } from '../../contexts/api/dashboard/ApiDashboardStatistik'
import ButtonDownload from './ButtonDownload'

function ChartInfo() {
  const context = useApiDashboardStatistik()
  console.log(context)
  return (
    <div className='chartInfo'>
      <p>
        {
          context.data?.map((item, i) => (
            <>
              {i === 0 ? dayjs(item.date).format('DD MMMM YYYY') + ' - ' : ''}
              {context.data?.length - 1 === i ? dayjs(item.date).format('DD MMMM YYYY') : ''}
            </>
          ))
        }
      </p>

      {/* 27 Oktober 2022 - 02 September 2022 */}
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