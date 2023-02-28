import React from 'react'
import peopleImg from '../assets/images/people-1.jpg'
import arrowDown from '../assets/icons/arrow-down.svg'
import { useApiProfile } from '../contexts/api/ApiProfile'
import defaultfoto from '../assets/images/user-foto.png'

function Profile() {
  const context = useApiProfile()
  return (
    <div className='profile'>
      <img src={context.profileData?.foto ? context.profileData?.foto : defaultfoto} alt="" />
      <p>{context.profileData?.name}</p>
      <img src={arrowDown} alt="" />
    </div>
  )
}

export default Profile