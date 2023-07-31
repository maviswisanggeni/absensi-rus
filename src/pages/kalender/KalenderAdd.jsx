import React from 'react'
import NavKalender from '../../components/kalender/NavKalender'
import FormEvent from '../../components/kalender/FormEvent'
import PartisipasiEvent from '../../components/kalender/PartisipasiEvent'
import Sidebar from '../../components/sidebar/Sidebar'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkIsAddPage, getDetailKalender, resetFieldKalender, updateFieldKalender, updateStateKalender } from '../../features/kalenderSlice'
import { getKategori } from '../../features/ketegoriSlice'
import InfoBox from '../../components/InfoBox'
import dayjs from 'dayjs'
import 'dayjs/locale/id'

function KalenderAdd() {
  let { id, date } = useParams()
  const dispatch = useDispatch()
  const { statusResApi, messageResApi, isDisplayMessage, daySelected } = useSelector(state => state.kalender)

  useEffect(() => {
    dayjs.locale('id')
    dispatch(getKategori())
    dispatch(checkIsAddPage(id))
    dispatch(resetFieldKalender())
    dispatch(updateStateKalender({ name: 'daySelected', value: date }))
    if (id !== undefined) {
      dispatch(getDetailKalender(id))
    }
  }, [])

  useEffect(() => {
    dispatch(updateFieldKalender({
      name: 'waktuMulaiLibur',
      value: daySelected
    }))
    dispatch(updateFieldKalender({
      name: 'waktuSelesaiLibur',
      value: daySelected
    }))

    dispatch(updateFieldKalender({
      name: 'tanggalMulai',
      value: dayjs(date).format('YYYY-MM-DD')
    }))
    dispatch(updateFieldKalender({
      name: 'tanggalSelesai',
      value: dayjs(date).format('YYYY-MM-DD')
    }))
  }, [date])

  return (
    <div className='wrapper-kalender'>
      <Sidebar />
      <div className='wrapper-kalender-add'>
        {isDisplayMessage &&
          <InfoBox
            message={messageResApi}
            status={statusResApi}
            isDisplay={isDisplayMessage}
            setIsDisplay={updateStateKalender}
            stateName='isDisplayMessage'
          />
        }
        <NavKalender />
        <div className='wrapper-content'>
          <FormEvent />
          <PartisipasiEvent />
        </div>
      </div>
    </div>
  )
}

export default KalenderAdd