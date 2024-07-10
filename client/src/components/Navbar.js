import React from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHospital } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className='nav'>
      <div className='title'>
        <span className='good'>
          <FontAwesomeIcon icon={faHospital} style={{ marginRight: '10px', marginLeft: '50px' }} />
          <span className='g'>g</span>
          <span className='o1'>o</span>
          <span className='o2'>o</span>
          <span className='d'>d</span>
        </span>
        <span className='doctor'>Doctor</span>
      </div>
      <ul className='nav-list'>
        <li>
          <NavLink to="/" activeClassName='active'>Home</NavLink>
        </li>
        <li>
          <NavLink to="/doctor-profile" activeClassName='active'>Doctor's Profile</NavLink>
        </li>
        <li>
          <NavLink to="/user-profile" activeClassName='active'>User Profile</NavLink>
        </li>
        <li>
          <NavLink to="/login" activeClassName='active'>Login</NavLink>
        </li>
        <li>
          <NavLink to="/signup" activeClassName='active'>SignUp</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
