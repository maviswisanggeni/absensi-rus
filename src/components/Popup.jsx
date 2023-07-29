// PopupComponent.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsNavigate, setShowPopup } from '../features/popUpSlice';
import dangerIcon from '../assets/icons/danger.svg';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import token from '../datas/tokenAuthorization';

const PopUp = () => {
    const dispatch = useDispatch();
    const { showPopup, isNavigate } = useSelector(state => state.popup);
    const navigate = useNavigate()

    const handleRedirectToLogin = () => {
        // navigate('/login')
        dispatch(setShowPopup(false));
    };

    // if (isNavigate) {
    //     // navigate('/login')
    // }

    useEffect(() => {
        if (isNavigate) {
            localStorage.removeItem("token");
            navigate('/login')
            dispatch(setShowPopup(true));
            dispatch(setIsNavigate(false))
        }
    }, [isNavigate])

    useEffect(() => {
        if (!token()) {
            // navigate('login')
        }
    }, [])

    return (
        showPopup && (
            <div className='popUp'>
                <div className='modal__popup'>
                    <img src={dangerIcon} alt="" />
                    <h1>Permission Denied</h1>
                    <p>Kamu tidak mempunyai akses halaman ini</p>
                    <button onClick={handleRedirectToLogin}>Tutup</button>
                </div>
            </div>
        )
    );
};

export default PopUp;