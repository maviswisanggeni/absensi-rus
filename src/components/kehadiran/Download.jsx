import React from 'react'
import donwload from '../../assets/icons/download-grey.svg'
import { useTanggalKehadiran } from '../../contexts/app/ContextTanggalKehadiran'
import { useSelector } from 'react-redux'

function Download() {
  const context = useTanggalKehadiran()
  const { startTime, endTime, endText } = useSelector(state => state.kehadiran)

  function endTimeCondition() {
    if (endText === 'Tanggal berakhir') {
      return ''
    } else {
      return `&end_time=${endTime}`
    }
  }
  function downloadExcel() {
    window.location.replace(`https://absensiguru.smkrus.com/api/dashboard/donload?start_time=${startTime}${endTimeCondition()}`)
  }
  return (
    <div>
      <img src={donwload} alt="" onClick={downloadExcel} />
    </div>
  )
}

export default Download