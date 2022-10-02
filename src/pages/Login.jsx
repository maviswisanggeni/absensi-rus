import React from 'react'
import LogoLogin  from '../components/login/LogoLogin'
import Input from '../components/login/Input'
import ButtonSignIn from '../components/login/ButtonSignIn'
import emailIcon from "../assets/icons/email-icon-blue.svg";
import passwordIcon from "../assets/icons/password-icon-blue.svg";
import "../styles/css/Login.css";
import { Link } from "react-router-dom";


function Login() {
  
  return (
    <>
      <div className="login">
        <div className="login__container">
        <LogoLogin />
        <h1>Welcome Back</h1>
        <p>Masukkan email dan password untuk mengakses</p>
        <form>
          <Input imgSrc={emailIcon} type="email" placeholder="Masukkan email" />
          <Input imgSrc={passwordIcon} type="password" placeholder="Masukkan password" />
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