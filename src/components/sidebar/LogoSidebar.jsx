import React from 'react'
import Logo from '../../assets/icons/rus-logo.svg'

function LogoSidebar() {
  return (
    <div className='logo-sidebar'>
        <img src={Logo} alt="logo" />
      <h1>SMK RUS Kudus</h1>
    </div>
  )
}

export default LogoSidebar