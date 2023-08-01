import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsNavigate, setShowPopup } from '../features/authorizeSlice';
import dangerIcon from '../assets/icons/danger.svg';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import token from '../datas/tokenAuthorization';

const AlertNotAuthorize = () => {
    const dispatch = useDispatch();
    const { showPopup, isNavigate } = useSelector(state => state.authorize);
    const navigate = useNavigate()

    const handleRedirectToLogin = () => {
        dispatch(setShowPopup(false));
    };

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

export default AlertNotAuthorize;