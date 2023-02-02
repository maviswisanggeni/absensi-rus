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

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState([]);
  const navigate = useNavigate();


  const loginHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('niy', email);
    formData.append('password', password);
    const url = "https://absensiguru.smkradenumarsaidkudus.sch.id/api/";
    const urlLocal = "http://127.0.0.1:8000/api/";

    await axios({
      method: "post",
      url: url + "login",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        console.log('login sukses')
        localStorage.setItem('token', response.data.token);
        navigate('/');
      })
      .catch((error) => {
        setValidation(error.response.data);
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
            <Input imgSrc={passwordIcon} type="password" placeholder="Masukkan password" value={password} setFunction={setPassword} />
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