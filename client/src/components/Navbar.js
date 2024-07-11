import React, { useContext } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHospital } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom";
import { AuthContext } from './AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    fetch('/logout', {
      method: 'DELETE',
      credentials: 'include',  // Include cookies in requests
    })
    .then(response => {
      if (response.status === 204) {
        logout();
      }
    });
  };

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
          <NavLink to="/" exact activeClassName='active'>Home</NavLink>
        </li>
        {user ? (
          <>
            <li>
              <NavLink to="/doctor-profile" activeClassName='active'>Doctor's Profile</NavLink>
            </li>
            <li>
              <NavLink to="/user-profile" activeClassName='active'>User Profile</NavLink>
            </li>
            <li>
              <NavLink to="/appointment" activeClassName='active'>Appointments</NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login" activeClassName='active'>Login</NavLink>
            </li>
            <li>
              <NavLink to="/signup" activeClassName='active'>SignUp</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
