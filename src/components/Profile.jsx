import React from 'react'
import peopleImg from '../assets/images/people-1.jpg'
import arrowDown from '../assets/icons/arrow-down.svg'
import { useApiProfile } from '../contexts/api/ApiProfile'
import defaultfoto from '../assets/images/user-foto.png'
import { useState } from 'react'
import setting from '../assets/icons/setting.svg'
import { useNavigate, Link } from 'react-router-dom'

function Profile() {
  const context = useApiProfile()
  const [active, setActive] = useState()
  let navigate = useNavigate()
  return (
    <div className='profile'>
      <div className='wrapper-profile-detail' onClick={() => setActive(!active)}>
        <div className='profile-detail'>
          <img src={context.profileData?.foto ? context.profileData?.foto : defaultfoto} alt="" />
          <p>{context.profileData?.name ? context.profileData?.name : 'User Admin'}</p>
          <img src={arrowDown} alt="" className={active ? 'active' : ''} />
        </div>
      </div>
      <div className={`${active ? 'active' : ''} dropdown-container`}>
        {/* <Link to={'/pengaturan/kategori-karyawan'} className='link-container'> */}
        <Link to={'/pengaturan/kategori-karyawan'} className={`${active ? 'active' : ''} dropdown-list`} onClick={() => console.log('test')}>
          <p>Pengaturan</p>
          <img src={setting} alt="" />
        </Link>
        {/* </Link> */}
        <div className={`${active ? 'active' : ''} dropdown-list`}>
          <p>Keluar</p>
          <div>
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 10C16 9.73478 15.8946 9.48043 15.7071 9.29289C15.5196 9.10536 15.2652 9 15 9L7.41 9L9.71 6.71C9.80373 6.61704 9.87812 6.50644 9.92889 6.38458C9.97966 6.26272 10.0058 6.13201 10.0058 6C10.0058 5.86799 9.97966 5.73728 9.92889 5.61542C9.87812 5.49356 9.80373 5.38296 9.71 5.29C9.61704 5.19627 9.50644 5.12188 9.38458 5.07111C9.26272 5.02034 9.13201 4.9942 9 4.9942C8.86799 4.9942 8.73728 5.02034 8.61542 5.07111C8.49356 5.12188 8.38296 5.19627 8.29 5.29L4.29 9.29C4.19896 9.3851 4.12759 9.49725 4.08 9.62C3.97998 9.86346 3.97998 10.1365 4.08 10.38C4.12759 10.5028 4.19896 10.6149 4.29 10.71L8.29 14.71C8.38324 14.8032 8.49393 14.8772 8.61575 14.9277C8.73757 14.9781 8.86814 15.0041 9 15.0041C9.13186 15.0041 9.26243 14.9781 9.38425 14.9277C9.50607 14.8772 9.61676 14.8032 9.71 14.71C9.80324 14.6168 9.8772 14.5061 9.92766 14.3842C9.97812 14.2624 10.0041 14.1319 10.0041 14C10.0041 13.8681 9.97812 13.7376 9.92766 13.6158C9.8772 13.4939 9.80324 13.3832 9.71 13.29L7.41 11L15 11C15.2652 11 15.5196 10.8946 15.7071 10.7071C15.8946 10.5196 16 10.2652 16 10ZM3 20H13C13.7956 20 14.5587 19.6839 15.1213 19.1213C15.6839 18.5587 16 17.7956 16 17V14C16 13.7348 15.8946 13.4804 15.7071 13.2929C15.5196 13.1054 15.2652 13 15 13C14.7348 13 14.4804 13.1054 14.2929 13.2929C14.1054 13.4804 14 13.7348 14 14V17C14 17.2652 13.8946 17.5196 13.7071 17.7071C13.5196 17.8946 13.2652 18 13 18H3C2.73478 18 2.48043 17.8946 2.29289 17.7071C2.10536 17.5196 2 17.2652 2 17L2 3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H13C13.2652 2 13.5196 2.10536 13.7071 2.29289C13.8946 2.48043 14 2.73478 14 3V6C14 6.26522 14.1054 6.51957 14.2929 6.70711C14.4804 6.89464 14.7348 7 15 7C15.2652 7 15.5196 6.89464 15.7071 6.70711C15.8946 6.51957 16 6.26522 16 6L16 3C16 2.20435 15.6839 1.44129 15.1213 0.878679C14.5587 0.316071 13.7956 0 13 0H3C2.20435 0 1.44129 0.316071 0.878679 0.878679C0.316071 1.44129 0 2.20435 0 3L0 17C0 17.7956 0.316071 18.5587 0.878679 19.1213C1.44129 19.6839 2.20435 20 3 20Z" fill="#FF4530" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile