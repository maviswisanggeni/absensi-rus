import React from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
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
import { getKategori, setCurrentKategori, setKategoriId } from '../../features/ketegoriSlice'
import { useState } from 'react'
import { getKaryawan, updateFieldValue, updateStateKaryawan } from '../../features/karyawanSlice'
import InfoBox from '../../components/InfoBox'

function Karyawan() {
  const { listKaryawan, isLoading, statusResApi, messageResApi, isDisplayMessage } = useSelector(state => state.karyawan)
  const { listKategori, kategoriId, loadingKategori, currentKategori } = useSelector(state => state.kategori)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const context = useApiKaryawan()
  const [isKategoriUpdated, setIsKategoriUpdated] = useState(false);

  useEffect(() => {
    dispatch(getKategori());
  }, [dispatch]);

  useEffect(() => {
    if (loadingKategori && currentKategori) {
      setIsKategoriUpdated(true)
    }
  }, [loadingKategori, currentKategori]);

  useEffect(() => {
    if (isKategoriUpdated && kategoriId) {
      console.log('this useEffect is rendering');
      dispatch(getKaryawan({ kategori_id: kategoriId }));
      dispatch(updateFieldValue({ field: 'kategoriId', value: kategoriId }));
      setIsKategoriUpdated(false);
    }
  }, [kategoriId, isKategoriUpdated]);

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
            funcKeterangan={updateStateKaryawan}
            path='/karyawan'
            loading={loadingKategori}
          />
          <div className='filter-angka'>
            <Filter option1="Sesuai abjad" option2="Urut NIY"
              setState={updateStateKaryawan}
            />
            <p>{isLoading ? '-' : listKaryawan.length + ' Guru'}</p>
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