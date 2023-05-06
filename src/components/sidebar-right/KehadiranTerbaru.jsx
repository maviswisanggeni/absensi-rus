import dayjs from 'dayjs'
import React from 'react'
import refeshIcons from '../../assets/icons/refresh.svg'
import { useKehadiranListAbsensi } from '../../contexts/api/kehadiran/ContextApiKehadiranListData'
import userFoto from '../../assets/images/user-foto.png'

function KehadiranTerbaru() {
  const context = useKehadiranListAbsensi()
  function handleRefresh(){
    context.getDataJmlKehadiran()
  }

  return (
    <div className='kehadiran-terbaru'>
        <div className='header-refresh'>
            <h3>Kehadiran Terbaru</h3>
            <img src={refeshIcons} alt="" onClick={handleRefresh}/>
        </div>

        <ul>
          {
            !context.loading ? <div className='loading'></div> 
            : context.listAbsensiMasuk?.length === 0 ? <div className='no-data'>Tidak ada data</div>
            :context.listAbsensiMasuk?.map((item, index) => (
              <li key={index}>
                <img src={item?.pf_foto ? item?.pf_foto : userFoto} alt="" />
                <div>
                  <p>{item.user?.nama}</p>
                  <p>{item?.waktu_masuk}</p>
                </div>
              </li>
            ))
          }
        </ul>
    </div>
  )
}

export default KehadiranTerbaru