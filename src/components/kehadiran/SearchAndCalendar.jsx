import React, { useEffect, useState } from 'react'
import Search from '../Search'
import PilihTanggal from './PilihTanggal'
import calenderIcon from '../../assets/icons/arrow-right.svg'
import { useTanggalKehadiran } from '../../contexts/app/ContextTanggalKehadiran'
import searchIcon from '../../assets/icons/search-icon.svg'
import formatDate from '../useFormatCalendar'
import { useDispatch, useSelector } from 'react-redux'
import { getKehadiran, setEndText, setEndTime, setSearch, setStartTIme, setStartText } from '../../features/kehadiranSlice'
import { useSearchParams } from 'react-router-dom'

function SearchAndCalendar() {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(null)
  const context = useTanggalKehadiran()
  const dispatch = useDispatch()
  const { startTime, endTime, search, startText, endText } = useSelector(state => state.kehadiran)
  let [searchParams, setSearchParams] = useSearchParams();

  // Step 1: Define additional state
  const [isParamsUpdated, setIsParamsUpdated] = useState(false);

  useEffect(() => {
    // Step 2: Update startTime, endTime, and search based on searchParams
    const startTime = searchParams.get('start_time') ? searchParams.get('start_time') : formatDate(new Date());
    const endTime = searchParams.get('end_time') === 'null' ? null : searchParams.get('end_time');
    const search = searchParams.get('search') ? searchParams.get('search') : '';

    const startText = searchParams.get('start_time') ? searchParams.get('start_time') : 'Tanggal mulai';
    const endText = searchParams.get('end_time') === null ? 'Tanggal berakhir' : searchParams.get('end_time') === 'null' ? 'Tanggal berakhir' : searchParams.get('end_time');

    setStartDate(new Date(startTime));
    setEndDate(endTime === null ? null : new Date(endTime));
    dispatch(setStartTIme(startTime));
    dispatch(setEndTime(endTime));
    dispatch(setSearch(search));
    dispatch(setStartText(startText));
    dispatch(setEndText(endText));

    // Set the flag to indicate that parameters have been updated
    setIsParamsUpdated(true);
  }, [searchParams.toString()]);

  useEffect(() => {
    // Step 3: Call getKehadiran when searchParams change and parameters are updated
    if (isParamsUpdated) {
      dispatch(getKehadiran({ start_time: startTime, end_time: endTime, search: search }));
      setIsParamsUpdated(false); // Reset the flag
    }
  }, [searchParams.toString(), isParamsUpdated]);

  async function handleSearch(e) {
    e.preventDefault()
    dispatch(getKehadiran({ start_time: startTime, end_time: endTime, search: search }))
    setSearchParams({
      'search': search,
      'start_time': startTime,
      'end_time': endTime
    })
  }

  return (
    <form className='search-calendar'>
      <Search placeholder='Cari guru atau karyawan' value={search}
        setSearch={setSearch}
      />
      <div className='wrapper-pilih-tanggal'>
        <PilihTanggal
          text={startText}
          setDate={setStartDate}
          setText={setStartText}
          value={startDate}
          setTime={setStartTIme}
        />
        <img src={calenderIcon} alt="" />
        <PilihTanggal
          text={endText}
          setDate={setEndDate}
          setText={setEndText}
          value={endDate}
          setTime={setEndTime}
        />
      </div>
      <button
        className='btn-search' onClick={handleSearch}><img src={searchIcon} alt="" /></button>
    </form>
  )
}

export default SearchAndCalendar