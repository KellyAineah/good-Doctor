import React from 'react';
import Carousel from './Carousel';
import CardContainer from './CardContainer';
import SmallCardContainer from "./SmallCardContainer";
import { useHistory } from 'react-router-dom';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import './HeartbeatIcon.css';
 

function Home() {
  const history = useHistory();

  const handleLoginClick = () => {
    history.push('/login');
  };

  return (
    <div>
      <p className='paragraph'>
        <span>Your Health, Our Priority <FontAwesomeIcon icon={faHeartbeat} className='heartbeat-icon' /></span>
      </p>
      <Carousel />
      <CardContainer />
      <SmallCardContainer />
      <div className='button-container'>
        <button className='logn-button' onClick={handleLoginClick}>click here for more services</button>
      </div>
    </div>
  );
}

export default Home;
