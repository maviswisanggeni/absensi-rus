import React from 'react'
import donwload from '../../assets/icons/download-grey.svg' 
import { useTanggalKehadiran } from '../../contexts/app/ContextTanggalKehadiran'

function Download() {
  const context = useTanggalKehadiran()
  function endTimeCondition(){
    if(context.endText === 'Tanggal berakhir'){
      return ''
    }else{
      return `?end_time=${context.endTime}`
    }
  }
  function downloadExcel(){
    window.location.replace(`https://absensiguru.smkrus.com/api/dashboard/donload?start_time=${context.startTime}${endTimeCondition()}`)
  }
  return (
    <div>
        <img src={donwload} alt="" onClick={downloadExcel}/>
    </div>
  )
}

export default Download