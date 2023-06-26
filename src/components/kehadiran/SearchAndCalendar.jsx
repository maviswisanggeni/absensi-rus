import React, { useEffect, useState } from 'react'
import Search from '../Search'
import PilihTanggal from './PilihTanggal'
import calenderIcon from '../../assets/icons/arrow-right.svg'
import { useTanggalKehadiran } from '../../contexts/app/ContextTanggalKehadiran'
import searchIcon from '../../assets/icons/search-icon.svg'
import formatDate from '../useFormatCalendar'
import { useDispatch, useSelector } from 'react-redux'
import { getKehadiran, updateStateKehadiran } from '../../features/kehadiranSlice'
import { useSearchParams } from 'react-router-dom'
import { getJmlKehadiranKehadiran } from '../../features/jmlKehadiranSlice'

function SearchAndCalendar() {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(null)
  const context = useTanggalKehadiran()
  const dispatch = useDispatch()
  const { startTime, endTime, search, startText, endText, isPaginationClicked } = useSelector(state => state.kehadiran)
  let [searchParams, setSearchParams] = useSearchParams();

  const [isParamsUpdated, setIsParamsUpdated] = useState(false);

  useEffect(() => {
    dispatch(updateStateKehadiran({ name: 'isPaginationClicked', value: false }))
  }, [])

  useEffect(() => {
    if (!isPaginationClicked) {
      console.log('this effect is called');
      const startTime = searchParams.get('start_time') ? searchParams.get('start_time') : formatDate(new Date());
      const endTime = searchParams.get('end_time') === 'null' ? null : searchParams.get('end_time');
      const search = searchParams.get('search') ? searchParams.get('search') : '';

      const startText = searchParams.get('start_time') ? searchParams.get('start_time') : 'Tanggal mulai';
      const endText = searchParams.get('end_time') === null ? 'Tanggal berakhir' : searchParams.get('end_time') === 'null' ? 'Tanggal berakhir' : searchParams.get('end_time');

      setStartDate(new Date(startTime));
      setEndDate(endTime === null ? null : new Date(endTime));
      dispatch(updateStateKehadiran({ name: 'startTime', value: startTime }));
      dispatch(updateStateKehadiran({ name: 'endTime', value: endTime }));
      dispatch(updateStateKehadiran({ name: 'search', value: search }));
      dispatch(updateStateKehadiran({ name: 'startText', value: startText }));
      dispatch(updateStateKehadiran({ name: 'endText', value: endText }));

      setIsParamsUpdated(true);
      dispatch(updateStateKehadiran({ name: 'isPaginationClicked', value: false }))
    }
  }, [searchParams, isPaginationClicked, dispatch]);

  useEffect(() => {
    if (isParamsUpdated) {
      dispatch(getKehadiran({ start_time: startTime, end_time: endTime, search: search }));
      dispatch(getJmlKehadiranKehadiran({ start_time: startTime, end_time: endTime }))
      setIsParamsUpdated(false);
    }
  }, [searchParams.toString(), isParamsUpdated, dispatch]);

  async function handleSearch(e) {
    e.preventDefault()
    dispatch(getKehadiran({ start_time: startTime, end_time: endTime, search: search }))
    dispatch(getJmlKehadiranKehadiran({ start_time: startTime, end_time: endTime }))
    setSearchParams({
      'search': search,
      'start_time': startTime,
      'end_time': endTime
    })
  }

  return (
    <form className='search-calendar'>
      <Search placeholder='Cari guru atau karyawan' value={search}
        setSearch={updateStateKehadiran}
      />
      <div className='wrapper-pilih-tanggal'>
        <PilihTanggal
          text={startText}
          setText={updateStateKehadiran}
          stateText='startText'

          setDate={setStartDate}
          date={startDate}

          setTime={updateStateKehadiran}
          stateTime='startTime'
        />
        <img src={calenderIcon} alt="" />
        <PilihTanggal
          text={endText}
          setText={updateStateKehadiran}
          stateText='endText'

          setDate={setEndDate}
          date={endDate}

          setTime={updateStateKehadiran}
          stateTime='endTime'
        />
      </div>
      <button
        className='btn-search' onClick={handleSearch}><img src={searchIcon} alt="" /></button>
    </form>
  )
}

export default SearchAndCalendar