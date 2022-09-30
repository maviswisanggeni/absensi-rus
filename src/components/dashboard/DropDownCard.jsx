import React from "react";

function DropDownCard({ data = [], setOpen, setCurrent, current }){
  function log(e){
    setOpen(false)
    setCurrent(e.innerText)
}
  return(
    <div className="shadow h-auto w-56 absolute drop-down-content">
      <ul className="text-left">
      {data.map((item, i) => (
        <li key={i} className={item === current ? 'activeDropdownli' : ''} onClick={(item) => log(item.target)}>
          {item}  
        </li>
      ))} 
      </ul>
    </div>
  )
}
export default DropDownCard;
