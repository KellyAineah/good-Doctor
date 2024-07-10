import React from 'react'
import Carousel from './Carousel'
import './Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import './HeartbeatIcon.css';

function Home() {
  return (
    <div>
      <p className='paragraph'>
      <span>Your Health, Our Priority <FontAwesomeIcon icon={faHeartbeat} className='heartbeat-icon' /></span>
      </p>
      <Carousel />
      
    </div>
  )
}

export default Home
