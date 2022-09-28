import React from "react";
import arrowDown from '../../assets/icons/arrow-down.svg';

const Button = ({ onClick, current }) => (
  <button className='' onClick={onClick}>
    {current}
    <img src={arrowDown} alt="" />
  </button>
);

export default Button;
