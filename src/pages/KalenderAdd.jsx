import React from 'react'
import NavKalender from '../components/kalender/NavKalender'
import FormEvent from '../components/kalender/FormEvent'
import PartisipasiEvent from '../components/kalender/PartisipasiEvent'
import Sidebar from '../components/sidebar/Sidebar'
import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { checkIsAddPage, getDetailKalender, resetFieldKalender, updateFieldKalender } from '../features/kalenderSlice'
import { getKategori } from '../features/ketegoriSlice'

function KalenderAdd() {
  let id = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getKategori())
    dispatch(checkIsAddPage(id.id))
    dispatch(resetFieldKalender())
    dispatch(updateFieldKalender({ name: 'daySelected', value: id.date }))
    if (id.id !== undefined) {
      dispatch(getDetailKalender(id.id))
    }
  }, [])

  return (
    <div className='wrapper-kalender'>
      <Sidebar />
      <div className='wrapper-kalender-add'>
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