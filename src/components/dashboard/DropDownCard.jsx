import React from "react";

const liCls =
  "p-3 border text-gray-700 hover:text-white hover:bg-indigo-700 cursor-pointer";

  function log(e){
    // setOpen(false)
    console.log(e);
}
const DropDownCard = ({ data = [], setOpen }) => (

  <div className="shadow h-auto w-56 absolute drop-down-content">
    <ul className="text-left">
      {data.map((item, i) => (
        <li key={i} className='' onClick={(item) => log(item.target)}>
          {item}  
        </li>
      ))}
    </ul>
  </div>
);

export default DropDownCard;
