import React, { useEffect } from 'react'
import refeshIcons from '../../assets/icons/refresh.svg'
import { useKehadiranListAbsensi } from '../../contexts/api/kehadiran/ContextApiKehadiranListData'
import userFoto from '../../assets/images/user-foto.png'
import { useDispatch, useSelector } from 'react-redux'
import { getKehadiranTerbaru } from '../../features/kehadiranSlice'

function KehadiranTerbaru() {
  const context = useKehadiranListAbsensi()
  const dispatch = useDispatch()
  const { startTime, loadingKehadiranTerbaru, kehadiranTerbaru } = useSelector(state => state.kehadiran)

  function handleRefresh() {
    context.getDataJmlKehadiran()
    dispatch(getKehadiranTerbaru({ start_time: startTime }))
  }

  useEffect(() => {
    dispatch(getKehadiranTerbaru({ start_time: null }))
  }, [])

  return (
    <div className='kehadiran-terbaru'>
      <div className='header-refresh'>
        <h3>Kehadiran Terbaru</h3>
        <img src={refeshIcons} alt="" onClick={handleRefresh} />
      </div>

      <ul>
        {
          !loadingKehadiranTerbaru ? <div className='loading'></div>
            : kehadiranTerbaru?.length === 0 ? <div className='no-data'>Tidak ada data</div>
              : kehadiranTerbaru?.map((item, index) => (
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