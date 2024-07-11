import React from 'react';
import './Footer.css';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';
function Footer() {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <div className='footer-row'>
          <div className='footer-col'>
            <h4>About goodDoctor</h4>
            <p>
              goodDoctor is dedicated to providing remote medical consultations and health services to underserved areas. Our mission is to deliver accessible healthcare solutions through technology.
            
              <FontAwesomeIcon icon={faHeartbeat} style={{ marginRight: '10px' }} /><FontAwesomeIcon icon={faHeartbeat} style={{ marginRight: '10px' }} /><FontAwesomeIcon icon={faHeartbeat} style={{ marginRight: '10px' }} /><FontAwesomeIcon icon={faHeartbeat} style={{ marginRight: '10px' }} />
            </p>
          </div>
          <div className='footer-col'>
            <h4>Quick Links</h4>
            <ul className='list-unstyled'>
              <li><a href="/">Home</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/signup">SignUp</a></li>
              
              
            </ul>
          </div>
          <div className='footer-col'>
            <h4>Contact Us</h4>
            <ul className='list-unstyled'>
              <li><FontAwesomeIcon icon={faPhone} /> (254) 123-456-789</li>
              <li><FontAwesomeIcon icon={faEnvelope} /> <a href="mailto:info@gooddoctor.com">info@gooddoctor.com</a></li>
              <li>Nairobi, Kenya</li>
            </ul>
          </div>
        </div>
        <div className="social-icons">
          <FontAwesomeIcon icon={faTwitter} />
          <FontAwesomeIcon icon={faFacebook} />
          <FontAwesomeIcon icon={faInstagram} />
        </div>
      </div>
      <div className="copyright">
        <p>&copy; {new Date().getFullYear()} goodDoctor. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
