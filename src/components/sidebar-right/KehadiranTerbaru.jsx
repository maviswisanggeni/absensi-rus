import React, { useEffect } from 'react'
import refeshIcons from '../../assets/icons/refresh.svg'
import { useKehadiranListAbsensi } from '../../contexts/api/kehadiran/ContextApiKehadiranListData'
import userFoto from '../../assets/images/user-foto.png'
import { useDispatch, useSelector } from 'react-redux'
import { getKehadiranTerbaru } from '../../features/kehadiranSlice'
import moment from 'moment/moment'
import useImgError from '../../hooks/useImgError'

function KehadiranTerbaru() {
  const context = useKehadiranListAbsensi()
  const dispatch = useDispatch()
  const { loadingKehadiranTerbaru, kehadiranTerbaru } = useSelector(state => state.kehadiran)

  function handleRefresh() {
    dispatch(getKehadiranTerbaru({ start_time: null }))
  }

  useEffect(() => {
    dispatch(getKehadiranTerbaru({ start_time: null }))
  }, [])

  function formatTime(time) {
    const currentTime = moment();
    const formattedTime = moment(time, 'HH:mm:ss');

    const diffInMinutes = currentTime.diff(formattedTime, 'minutes');
    const diffInHours = currentTime.diff(formattedTime, 'hours');

    if (diffInMinutes <= 1) {
      return 'Baru Saja';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} menit yang lalu`;
    } else if (diffInHours < 24) {
      return `${diffInHours} jam yang lalu`;
    } else {
      return formattedTime.format('HH:mm:ss');
    }
  }

  return (
    <div className='kehadiran-terbaru'>
      <div className='header-refresh'>
        <h3>Kehadiran Terbaru</h3>
        <img src={refeshIcons} alt="" onClick={handleRefresh} />
      </div>

      <ul>
        {
          loadingKehadiranTerbaru ? <div className='loading'></div>
            : kehadiranTerbaru?.length === 0 ? <div className='no-data'>Tidak ada data</div>
              : kehadiranTerbaru?.map((item, index) => (
                <li key={index}>
                  <img src={item?.user?.link_foto ? item?.user?.link_foto : userFoto} onError={useImgError} alt="" />
                  <div>
                    <p>{item.user?.nama}</p>
                    <p>{formatTime(item?.waktu_masuk)}</p>
                  </div>
                </li>
              ))
        }
      </ul>
    </div>
  )
}

export default KehadiranTerbaru