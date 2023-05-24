import React from 'react'
import rusLogo from '../../assets/icons/rus-logo.svg'
import Profile from '../Profile'


function NavbarPengaturan() {
    return (
        <div className='bg-navbar'>
            <div className='wrapper-navbar'>
                <div className='wrapper-logo'>
                    <img src={rusLogo} alt="" />
                    <h1>SMK Raden Umar Sadi</h1>
                </div>
                <Profile />
            </div>
        </div>
    )
}

export default NavbarPengaturan