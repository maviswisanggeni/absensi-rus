import React from "react";

function Input(props) {
  return (
    <div className="login__input">
      <img src={props.imgSrc} alt="icon" />
      <input type={props.type} placeholder={props.placeholder} value={props.value} onChange={(e) => props.setFunction(e.target.value)} required />
    </div>
  );
}

export default Input;