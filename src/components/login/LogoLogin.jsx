import React from "react";
import Logo from "../../assets/icons/rus-logo.svg";

function LogoLogin() {
  return (
    <div className="login__logo">
        <img src={Logo} alt="logo" />
    </div>
  );
}

export default LogoLogin;