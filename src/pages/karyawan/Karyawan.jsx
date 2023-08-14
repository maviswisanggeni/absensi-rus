import React from 'react'
import { Link, Route, Routes, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Tabbar from '../../components/Tabbar'
import Profile from '../../components/Profile'
import Search from '../../components/Search'
import '../../styles/css/Karyawan.css'
import Table from '../../components/karyawan/Table'
import searchIcon from '../../assets/icons/search-icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../../components/sidebar/Sidebar'
import { useEffect } from 'react'
import { getKategori, setCurrentKategori, setIsInitial, setKategoriId } from '../../features/ketegoriSlice'
import { useState } from 'react'
import { getKaryawan, resetTable, updateFieldValue, updateStateKaryawan } from '../../features/karyawanSlice'
import InfoBox from '../../components/InfoBox'
import LoadingTable from '../../components/LoadingTable'
import LoadingTabbar from '../../components/LoadingTabbar'
import Skeleton from 'react-loading-skeleton'

function Karyawan() {
  const { listKaryawan, isLoading, statusResApi, messageResApi, isDisplayMessage, search } = useSelector(state => state.karyawan)
  const { listKategori, kategoriId, loadingKategori, currentKategori } = useSelector(state => state.kategori)
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const [isKategoriUpdated, setIsKategoriUpdated] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    dispatch(resetTable())
    dispatch(getKategori());
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;

    if (currentPath === '/karyawan/' && listKategori.length > 0) {
      const defaultPath = `/karyawan/${listKategori[0]?.kategori}`;
      navigate(defaultPath);
    }

    if (searchParams.get('paginate')) {
      dispatch(updateStateKaryawan({ name: 'currentPage', value: parseInt(searchParams.get('paginate')) }));
    }
  }, [location.pathname, listKategori, navigate, searchParams]);

  useEffect(() => {
    if (searchParams.get('search') && !loadingKategori) {
      dispatch(updateStateKaryawan({ name: 'search', value: searchParams.get('search') }));
      dispatch(getKaryawan({ search: searchParams.get('search') }))
    }
  }, [loadingKategori])

  useEffect(() => {
    if (listKategori.length > 0) {
      const initialOption = listKategori.find(option =>
        option.kategori === decodeURIComponent(location.pathname.split('/').pop())
      );
      if (initialOption) {
        dispatch(setCurrentKategori(initialOption.kategori))
        dispatch(setKategoriId(initialOption.id))
      }
    }
  }, [location.pathname, loadingKategori])

  useEffect(() => {
    if (!loadingKategori && currentKategori) {
      setIsKategoriUpdated(true)
      dispatch(setIsInitial(false))
    }
  }, [loadingKategori, currentKategori]);

  useEffect(() => {
    if (isKategoriUpdated && kategoriId && !searchParams.get('search')) {
      dispatch(getKaryawan({ kategori_id: kategoriId }));
      dispatch(updateFieldValue({ field: 'kategoriId', value: kategoriId }));
      setIsKategoriUpdated(false);
    }
  }, [kategoriId, isKategoriUpdated]);

  useEffect(() => {
    dispatch(updateStateKaryawan({ name: 'currentPage', value: 1 }))
  }, [location.pathname.split('/').pop()]);

  function handleSearch() {
    dispatch(getKaryawan({ search }))
    dispatch(updateStateKaryawan({ name: 'currentPage', value: 1 }))
    setSearchParams({
      'search': search
    })
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <div className='wrapper-karyawan'>
      <Sidebar />
      <div className='karyawan'>
        <InfoBox
          message={messageResApi}
          status={statusResApi}
          isDisplay={isDisplayMessage}
          setIsDisplay={updateStateKaryawan}
          stateName='isDisplayMessage'
        />
        <div className='search-and-profile'>
          <div className='wrap-search'>
            <Search
              placeholder='Cari guru / karyawan'
              value={search}
              setSearch={updateStateKaryawan}
              stateName={'search'}
              onKeyDown={handleKeyDown}
              onChange={(e) => dispatch(updateStateKaryawan({ name: 'search', value: e.target.value }))}
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

        {!loadingKategori
          ? <div className='tabbar-filter'>
            <Tabbar
              options={listKategori}
              setKategoriId={setKategoriId}
              setCurrentKategori={setCurrentKategori}
              searchParams={''}
              setKeterangan={updateStateKaryawan}
              path='/karyawan'
              loading={loadingKategori}
            />

            <div className='filter-angka'>
              {isLoading
                ? <Skeleton
                  width={100}
                  height={25}
                />
                : <p>{listKaryawan.length + ' Guru'}</p>
              }
            </div>

          </div>

          : <div className='wrapper__skeleton'>
            <LoadingTabbar amount={5} loadingFilter={isLoading} />
            <LoadingTable />
          </div>
        }

        {(loadingKategori || isLoading) ?
          <LoadingTable size={'large'} />
          : <>
            <Routes>
              {listKategori.map((item, index) => {
                return (
                  <Route key={index} path={`/${item.kategori}`} element={<Table />}>
                  </Route>
                )
              })}
            </Routes>
          </>
        }
      </div>
    </div >
  )
}

export default Karyawan