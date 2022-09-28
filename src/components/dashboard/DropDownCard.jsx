import React from "react";

function DropDownCard({ data = [], setOpen, setCurrent }){
  function log(e){
    setOpen(false)
    setCurrent(e.innerText)
}
  return(
    <div className="shadow h-auto w-56 absolute drop-down-content">
      <ul className="text-left">
      {data.map((item, i) => (
        <li key={i} className='' onClick={(item) => log(item.target)}>
          {item}  
        </li>
      ))}
      </ul>
    </div>
  )
}
export default DropDownCard;
