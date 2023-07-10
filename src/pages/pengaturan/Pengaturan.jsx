import React from 'react'
import '../../styles/css/Pengaturan.css'
import NavbarPengaturan from '../../components/pengaturan/NavbarPengaturan'
import SidebarPengaturan from '../../components/pengaturan/SidebarPengaturan'
import { Routes, Route } from 'react-router'
import ImportUser from './ImportUser'
import KategoriKaryawan from './KategoriKaryawan'
import RadiusAbsen from './RadiusAbsen'
import EditKategoriKaryawan from './EditKategoriKaryawan'
import BatasWaktu from './BatasWaktu'
import InfoBox from '../../components/InfoBox'
import { useSelector } from 'react-redux'
import { updateInputPengaturan } from '../../features/pengaturanSlice'

function Pengaturan() {
    const { statusResApi, messageResApi, isDisplayMessage } = useSelector((state) => state.pengaturan)

    return (
        <div className='bg-pengaturan'>
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
                setIsDisplay={updateInputPengaturan}
                stateName='isDisplayMessage'
            />
        </div>
    )
}

export default Pengaturan