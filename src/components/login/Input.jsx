import React from "react";
import iconEye from '../../assets/icons/eye.svg';
import { useState } from "react";

function Input(props) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="login__input">
      <img src={props.imgSrc} alt="icon" />
      <input
        type={
          props.type === 'password' ? showPassword ? 'text' : 'password' : props.type
        }
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.setFunction(e.target.value)}
        required
      />
      {props.type === 'password' && <img className='eye__icon' src={iconEye} alt="" onClick={() => setShowPassword(!showPassword)} />}
    </div>
  );
}

export default Input;