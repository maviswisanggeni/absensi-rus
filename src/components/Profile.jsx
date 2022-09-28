import React from 'react'
import peopleImg from '../assets/images/people-1.jpg'
import arrowDown from '../assets/icons/arrow-down.svg'

function Profile() {
  return (
    <div className='profile'>
      <img src={peopleImg} alt="" />
      <p>User Admin</p>
      <img src={arrowDown} alt="" />
    </div>
  )
}

export default Profile