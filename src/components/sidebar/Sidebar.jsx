import React, { useEffect } from 'react'
import '../../styles/css/Sidebar.css'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import LogoSidebar from './LogoSidebar'
import dashboardLogoBlue from '../../assets/icons/dashboard-icon-blue.svg'
import dashboardLogoGrey from '../../assets/icons/dashboard-icon-grey.svg'
import kehadiranLogoGrey from '../../assets/icons/kehadiran-icon-grey.svg'
import kehadiranLogoBlue from '../../assets/icons/kehadiran-icon-blue.svg'
import karyawanLogoGrey from '../../assets/icons/karyawan-icon-grey.svg'
import karyawanLogoBlue from '../../assets/icons/karyawan-icon-blue.svg'
import kalenderLogoGrey from '../../assets/icons/kalender-icon-grey.svg'
import kalenderLogoBlue from '../../assets/icons/kalender-icon-blue.svg'
import loginLogoGrey from '../../assets/icons/logout-icon-grey.svg'
import axios from 'axios'
import { useState } from 'react'
import LoadingFullscreen from '../LoadingFullscreen'

function Sidebar() {
  let query = useLocation()
  const token = localStorage.getItem("token");
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  if (query.pathname === "/login") {
    return null
  }

  const logoutHanlder = async () => {
    setLoading(true)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const url = 'https://absensiguru.smkrus.com/api/logout'
    await axios.get(url)
      .then(() => {
        localStorage.removeItem("token");
        navigate('/login')
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  };

  const dataSidebar = [
    {
      id: 1,
      path: '/dashboard',
      img: dashboardLogoGrey,
      imgActive: dashboardLogoBlue,
      text: 'Dashboard'
    },
    {
      id: 2,
      path: '/kehadiran',
      tabbarPath: '/kehadiran/Masuk',
      img: kehadiranLogoGrey,
      imgActive: kehadiranLogoBlue,
      text: 'Kehadiran'
    },
    {
      id: 3,
      path: '/karyawan',
      tabbarPath: `/karyawan/`,
      img: karyawanLogoGrey,
      imgActive: karyawanLogoBlue,
      text: 'Karyawan'
    },
    {
      id: 4,
      path: '/kalender',
      img: kalenderLogoGrey,
      imgActive: kalenderLogoBlue,
      text: 'Kalender'
    },
    {
      id: 5,
      path: 'logout',
      img: loginLogoGrey,
      imgActive: loginLogoGrey,
      text: 'Logout'
    },
  ]

  return (
    <nav className='nav'>
      <LogoSidebar />
      <ul>
        {dataSidebar.map((item) => (
          <li key={item.id}>
            {item.text === 'Logout'
              ? <a onClick={logoutHanlder} className={query.pathname === '/login' ? 'active-sidebar' : ''}>
                <img src={query.pathname === '/login' ? loginLogoGrey : loginLogoGrey} alt="" />
                Logout
              </a>
              : <NavLink
                to={item.tabbarPath || item.path}
                className={query.pathname.startsWith(item.path) ? 'active-sidebar' : ''}
              >
                <img src={query.pathname.startsWith(item.path) ? item.imgActive : item.img} alt="" />
                {item.text}
              </NavLink>}
          </li>
        ))}
      </ul>
      <LoadingFullscreen loading={loading} />
    </nav>
  )
}

export default Sidebar