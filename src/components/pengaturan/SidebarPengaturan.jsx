import React from 'react'
import kategoriIcon from '../../assets/icons/kategori-icon.svg'
import fileIcon from '../../assets/icons/file-icon.svg'
import radiusIcon from '../../assets/icons/radius-icon.svg'
import logoutIcon from '../../assets/icons/logout-icon-red.svg'
import waktuIcon from '../../assets/icons/timer.svg'
import { NavLink } from 'react-router-dom'

function SidebarPengaturan() {
    const navigationData = [
        {
            icon: kategoriIcon,
            nama: 'Kategori Karyawan',
            link: 'kategori-karyawan'
        },
        {
            icon: fileIcon,
            nama: 'Import User',
            link: 'import-user'
        },
        {
            icon: radiusIcon,
            nama: 'Radius Absen',
            link: 'radius-absen'
        },
        {
            icon: waktuIcon,
            nama: 'Batas Waktu',
            link: 'batas-waktu'
        }
    ]

    function indicator(isActive, isPending) {
        return isPending ? "pending" : isActive ? "active" : ""
    }

    return (
        <div className='wrapper-sidebar'>
            <div className='wrapper-sidebar-top'>
                {navigationData.map((data, index) => {
                    return (
                        <NavLink
                            to={data.link}
                            key={index}
                            className={'sidebar-container' + indicator()}
                        >
                            <img src={data.icon} alt="" />
                            {data.nama}
                        </NavLink>
                    )
                })}
            </div>
            <NavLink
                to='/'
                className={'keluar-pengaturan'}
            >
                <img src={logoutIcon} alt="" />
                Keluar Pengaturan
            </NavLink>
        </div>
    )
}

export default SidebarPengaturan