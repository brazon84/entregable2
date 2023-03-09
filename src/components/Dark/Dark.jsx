import React, { useState } from 'react'
import './Dark.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';

const Toggle = (props) => {
    const [dark, setDark] = useState(false);
    const toggleClick = () =>{
        setDark(!dark);
        const body = document.querySelector('body');
        if (!dark) {
          body.style.backgroundColor = '#69cdfc';
        } else {
          body.style.backgroundColor = '#4f9abd';
        }
      };
          
        

          
  return (
    <div className="theme-toggle">
    <button className='dark' onClick={toggleClick}>
      {dark ? <FontAwesomeIcon icon={faToggleOff} /> : <FontAwesomeIcon icon={faToggleOn} />}
    </button>
  </div>
  )
}

export default Toggle
