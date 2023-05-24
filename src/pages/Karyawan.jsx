import React from 'react'
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Tabbar from '../components/Tabbar'
import Profile from '../components/Profile'
import Search from '../components/Search'
import '../styles/css/Karyawan.css'
import Filter from '../components/Filter'
import Table from '../components/karyawan/Table'
import { useApiKaryawan } from '../contexts/api/karyawan/ContextApiKaryawan'
import searchIcon from '../assets/icons/search-icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { filterToggle, getKaryawan, updateState } from '../features/karyawanSlice'
import Sidebar from '../components/sidebar/Sidebar'
import { useEffect } from 'react'
import { getKategori, setCurrentKategori, setKategoriId } from '../features/ketegoriSlice'
import { useState } from 'react'

function Karyawan() {
  const { listKaryawan, loading } = useSelector(state => state.karyawan)
  const { listKategori, kategoriId, loadingKategori, currentKategori } = useSelector(state => state.kategori)
  const dispatch = useDispatch()
  let location = useLocation()
  const navigate = useNavigate()
  const context = useApiKaryawan()
  const [isKategoriUpdated, setIsKategoriUpdated] = useState(false);

  useEffect(() => {
    dispatch(getKategori());
  }, [dispatch]);

  useEffect(() => {
    if (loadingKategori && currentKategori) {
      navigate(currentKategori);
      setIsKategoriUpdated(true)
    }
  }, [loadingKategori, currentKategori, navigate]);

  useEffect(() => {
    if (isKategoriUpdated) {
      if (kategoriId) {
        dispatch(getKaryawan({ kategori_id: kategoriId }));
      }
      setIsKategoriUpdated(false);
    }
  }, [kategoriId, isKategoriUpdated, dispatch]);

  // useEffect(() => {
  //   dispatch(getKategori())
  // }, [])

  // useEffect(() => {
  //   if (loadingKategori) {
  //     const currentPath = location.pathname.split('/').pop();
  //     if (currentPath === 'karyawan') {
  //       navigate(currentKategori);
  //     }
  //   }
  // }, [loadingKategori, currentKategori, navigate, location.pathname]);

  // useEffect(() => {
  //   if (loadingKategori) {
  //     const initialOption = listKategori.find(option => option.kategori === location.pathname.split('/').pop());
  //     if (initialOption) {
  //       dispatch(setKategoriId(initialOption.id))
  //     }
  //   }
  //   setIsKategoriUpdated(true);
  // }, [loadingKategori, location.pathname])

  // useEffect(() => {
  //   if (isKategoriUpdated) {
  //     dispatch(getKaryawan({ kategori_id: kategoriId }));
  //     setIsKategoriUpdated(false);
  //   }
  // }, [kategoriId, isKategoriUpdated])

  return (
    <div className='wrapper-karyawan'>
      <Sidebar />
      <div className='karyawan'>
        <div className='search-and-profile'>
          <div className='wrap-search'>
            <Search placeholder='Cari guru / karyawan'
            // setSearch={setSearch} 
            />
            <button className='btn-search'
            // onClick={searchKaryawan}
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
          <Tabbar
            options={listKategori}
            setKategoriId={setKategoriId}
            setCurrentKategori={setCurrentKategori}
            searchParams={''}
            funcPage={context.setCurrentPage}
            funcKeterangan={updateState}
            path='/karyawan'
          />
          <div className='filter-angka'>
            <Filter option1="Sesuai abjad" option2="Urut NIY"
              setState={updateState}
            />
            <p>{loading ? listKaryawan.length : 'loading'} Guru</p>
          </div>
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