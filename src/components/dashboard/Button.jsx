import React from "react";
import arrowDown from '../../assets/icons/arrow-down.svg';

const cls = "bg-indigo-700 text-white py-3 px-5 rounded";

const Button = ({ onClick }) => (
  <button className='' onClick={onClick}>
    Minggu
    <img src={arrowDown} alt="" />
  </button>
);

export default Button;
