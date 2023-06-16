import React from 'react'
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Tabbar from '../../components/Tabbar'
import Profile from '../../components/Profile'
import Search from '../../components/Search'
import '../../styles/css/Karyawan.css'
import Filter from '../../components/Filter'
import Table from '../../components/karyawan/Table'
import { useApiKaryawan } from '../../contexts/api/karyawan/ContextApiKaryawan'
import searchIcon from '../../assets/icons/search-icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../../components/sidebar/Sidebar'
import { useEffect } from 'react'
import { getKategori, setCurrentKategori, setIsInitial, setKategoriId } from '../../features/ketegoriSlice'
import { useState } from 'react'
import { getKaryawan, resetTable, updateFieldValue, updateStateKaryawan } from '../../features/karyawanSlice'
import InfoBox from '../../components/InfoBox'

function Karyawan() {
  const { listKaryawan, isLoading, statusResApi, messageResApi, isDisplayMessage, search } = useSelector(state => state.karyawan)
  const { listKategori, kategoriId, loadingKategori, currentKategori, isInitialPage } = useSelector(state => state.kategori)
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const context = useApiKaryawan()
  const [isKategoriUpdated, setIsKategoriUpdated] = useState(false);

  useEffect(() => {
    dispatch(resetTable())
    dispatch(getKategori());
  }, []);

  useEffect(() => {
    if (location.pathname.split('/').pop() === '') {
      dispatch(setIsInitial(true))
    }

    if (isInitialPage && !loadingKategori) {
      dispatch(setCurrentKategori(listKategori[0]?.kategori))
      dispatch(setKategoriId(listKategori[0]?.id))
      navigate(`/karyawan/${listKategori[0]?.kategori}`)
    }
  }, [loadingKategori])

  useEffect(() => {
    if (!loadingKategori && currentKategori) {
      setIsKategoriUpdated(true)
      dispatch(setIsInitial(false))
    }
  }, [loadingKategori, currentKategori]);

  useEffect(() => {
    if (isKategoriUpdated && kategoriId) {
      dispatch(getKaryawan({ kategori_id: kategoriId }));
      dispatch(updateFieldValue({ field: 'kategoriId', value: kategoriId }));
      setIsKategoriUpdated(false);
    }
  }, [kategoriId, isKategoriUpdated]);

  function handleSearch() {
    dispatch(getKaryawan({ kategori_id: kategoriId, search }))
  }

  return (
    <div className='wrapper-karyawan'>
      <Sidebar />
      <div className='karyawan'>
        {isDisplayMessage &&
          <InfoBox
            message={messageResApi}
            status={statusResApi}
            isDisplay={isDisplayMessage}
            setIsDisplay={updateStateKaryawan}
            stateName='isDisplayMessage'
          />
        }
        <div className='search-and-profile'>
          <div className='wrap-search'>
            <Search
              placeholder='Cari guru / karyawan'
              value={search}
              setSearch={updateStateKaryawan}
            />
            <button
              className='btn-search'
              onClick={handleSearch}
            >
              <img src={searchIcon} alt="" /></button>
          </div>
          <Profile />
        </div>

        <div className='title-btn'>
          <h1>Karyawan</h1>
          <Link to='/karyawan/add'>+ Add New</Link>
        </div>

        <div className='tabbar-filter'>
          {!loadingKategori &&
            <Tabbar
              options={listKategori}
              setKategoriId={setKategoriId}
              setCurrentKategori={setCurrentKategori}
              searchParams={''}
              funcPage={context.setCurrentPage}
              funcKeterangan={updateStateKaryawan}
              path='/karyawan'
              loading={loadingKategori}
            />
          }

          {loadingKategori &&
            <div className='wrapper-loading'>
              <div className='dots loading'></div>
            </div>
          }

          {!isLoading &&
            <div className='filter-angka'>
              <Filter option1="Sesuai abjad" option2="Urut NIY"
                setState={updateStateKaryawan}
              />
              <p>{listKaryawan.length + ' Guru'}</p>
            </div>
          }
        </div>
        <Routes>
          {listKategori.map((item, index) => {
            return (
              <Route key={index} path={`/${item.kategori}`} element={<Table />}>
              </Route>
            )
          })}
        </Routes>
      </div>
    </div>
  )
}

export default Karyawan