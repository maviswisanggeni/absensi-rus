import React from 'react'
import '../../styles/css/Pengaturan.css'
import NavbarPengaturan from '../../components/pengaturan/NavbarPengaturan'
import SidebarPengaturan from '../../components/pengaturan/SidebarPengaturan'
import { Routes, Route } from 'react-router'
import ImportUser from './ImportUser'
import KategoriKaryawan from './KategoriKaryawan'
import RadiusAbsen from './RadiusAbsen'
import EditKategoriKaryawan from './EditKategoriKaryawan'

function Pengaturan() {
    return (
        <div className='bg-pengaturan'>
            <NavbarPengaturan />
            <div className='pengaturan'>
                <SidebarPengaturan />
                <Routes>
                    <Route path='/kategori-karyawan' element={<KategoriKaryawan />} />
                    <Route path='/kategori-karyawan/:kategori/:id/*' element={<EditKategoriKaryawan />} />
                    <Route path='/import-user' element={<ImportUser />} />
                    <Route path='/radius-absen' element={<RadiusAbsen />} />
                </Routes>
            </div>
        </div>
    )
}

export default Pengaturan