import React from 'react'
import LogoLogin from '../components/login/LogoLogin'
import Input from '../components/login/Input'
import ButtonSignIn from '../components/login/ButtonSignIn'
import emailIcon from "../assets/icons/email-icon-blue.svg";
import passwordIcon from "../assets/icons/password-icon-blue.svg";
import "../styles/css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import apiUrl from '../datas/apiUrl';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState('');
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('niy', email);
    formData.append('password', password);

    await axios({
      method: "post",
      url: apiUrl() + 'login',
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      })
      .catch((error) => {
        setValidation(error.response.data.messege);
        console.log(error.response.data.messege)
      })
  }

  return (
    <>
      <div className="login">
        <div className="login__container">
          <LogoLogin />
          <h1>Welcome Back</h1>
          <p>Masukkan email dan password untuk mengakses</p>
          <form onSubmit={loginHandler}>
            <Input imgSrc={emailIcon} type="text" placeholder="Masukkan email" value={email} setFunction={setEmail} />
            {validation === 'user not found' && <p className="login__validation">{'Email tidak ada'}</p>}
            <Input imgSrc={passwordIcon} type="password" placeholder="Masukkan password" value={password} setFunction={setPassword} />
            {validation === 'wrong pass' && <p className="login__validation">{'Password Salah'}</p>}
            <ButtonSignIn />
          </form>
          <div className="login__forgotPassword">
            <p>Lupa password? <Link to="/">Reset Password</Link></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login