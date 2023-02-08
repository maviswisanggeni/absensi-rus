import React from 'react'
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

function Navbar() {
  let query = useLocation()
  const token = localStorage.getItem("token");
  const navigate = useNavigate()
 
  if (query.pathname === "/login") {
    return null
  }

  const logoutHanlder = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const url = 'https://absensiguru.smkrus.com/api/logout'
    await axios.get(url)
    .then(() => {
        localStorage.removeItem("token");
        navigate('/login')
    });
  };


  return (
    <nav>
        <LogoSidebar/>
        <ul>
          <li>
            <NavLink to='/' className={query.pathname === '/' ? 'active-sidebar' : ''}>
              <img src={query.pathname === '/' ? dashboardLogoBlue : dashboardLogoGrey} alt="" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to='/kehadiran' className={query.pathname === '/kehadiran' || query.pathname === '/kehadiran/detail- ' ? 'active-sidebar' : ''}>
              <img src={query.pathname === '/kehadiran' || query.pathname === '/kehadiran/detail' ? kehadiranLogoBlue : kehadiranLogoGrey} alt="" />
              Kehadiran
            </NavLink>
          </li>
          <li>
            <NavLink to='/karyawan' className={query.pathname === '/karyawan' ? 'active-sidebar' : ''}>
              <img src={query.pathname === '/karyawan' ? karyawanLogoBlue : karyawanLogoGrey} alt="" />
              karyawan
            </NavLink>
          </li>
          <li>
            <NavLink to='/kalender' className={query.pathname === '/kalender' ? 'active-sidebar' : ''}>
              <img src={query.pathname === '/kalender' ? kalenderLogoBlue : kalenderLogoGrey} alt="" />
              kalender
            </NavLink>
          </li>
          <li>
            <a onClick={logoutHanlder} className={query.pathname === '/login' ? 'active-sidebar' : ''}>
              <img src={query.pathname === '/login' ? loginLogoGrey : loginLogoGrey} alt="" />
              Logout
            </a>
          </li>
        </ul>
    </nav>
  )
}

export default Navbar