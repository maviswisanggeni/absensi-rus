import React from "react";
import arrowDown from '../../assets/icons/arrow-down.svg';

const Button = ({ onClick, current, open }) => (
  <button className='' onClick={onClick}>
    {current}
    <img src={arrowDown} className={open ? 'active' : ''} alt="" />
  </button>
);

export default Button;
