import React, { useEffect } from 'react'
import '../../styles/css/Pengaturan.css'
import NavbarPengaturan from '../../components/pengaturan/NavbarPengaturan'
import SidebarPengaturan from '../../components/pengaturan/SidebarPengaturan'
import { Routes, Route, useLocation } from 'react-router'
import ImportUser from './ImportUser'
import KategoriKaryawan from './KategoriKaryawan'
import RadiusAbsen from './RadiusAbsen'
import EditKategoriKaryawan from './EditKategoriKaryawan'
import BatasWaktu from './BatasWaktu'
import InfoBox from '../../components/InfoBox'
import { useSelector } from 'react-redux'
import { updateStatePengaturan } from '../../features/pengaturanSlice'

function Pengaturan() {
    const { statusResApi, messageResApi, isDisplayMessage } = useSelector((state) => state.pengaturan)
    const location = useLocation()

    useEffect(() => {
        const body = document.querySelector('body')

        if (location.pathname.startsWith('/pengaturan')) {
            body.classList.add('bg-pengaturan')
        }

        return () => {
            body.classList.remove('bg-pengaturan')
        }
    }, [location.pathname])

    return (
        <>
            <NavbarPengaturan />
            <div className='pengaturan'>
                <SidebarPengaturan />
                <Routes>
                    <Route path='/kategori-karyawan' element={<KategoriKaryawan />} />
                    <Route path='/kategori-karyawan/:kategori/:id/*' element={<EditKategoriKaryawan />} />
                    <Route path='/import-user/*' element={<ImportUser />} />
                    <Route path='/radius-absen' element={<RadiusAbsen />} />
                    <Route path='/batas-waktu' element={<BatasWaktu />} />
                </Routes>
            </div>

            <InfoBox
                message={messageResApi}
                status={statusResApi}
                isDisplay={isDisplayMessage}
                setIsDisplay={updateStatePengaturan}
                stateName='isDisplayMessage'
            />
        </>
    )
}

export default Pengaturan