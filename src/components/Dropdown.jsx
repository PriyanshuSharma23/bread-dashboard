import React from 'react';
import '../css/Dropdown.css'
import logo from '../assets/logo_final.png'

function Dropdown({ selectedIndex, handleSelection, data,district }) {
  return (
    <div className='dropdown-div'>
      <select className='dropdown-css' value={selectedIndex} onChange={(e) => handleSelection(e.target.value)}>
      {data.map((_, index) => (
        <option key={index} value={index}>
          {district[index]}
        </option>
      ))}
      </select>
      <div className='img-div'><img src={logo} alt='Logo' className='logo-img'></img></div>
    </div>
  );
}

export default Dropdown;
