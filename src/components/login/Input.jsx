import React from "react";

function Input(props) {
  return (
    <div className="login__input">
      <img src={props.imgSrc} alt="icon" />
      <input type={props.type} placeholder={props.placeholder} required />
    </div>
  );
}

export default Input;