import React from 'react';
import './SmallCardContainer.css';
import image1 from '../img/med1.jpeg'
import image2 from '../img/med3.png'
import image3 from '../img/med11.png'
import image4 from '../img/med12.jpg'
import image5 from '../img/med13.jpg'
import image6 from '../img/med14.png'

const smallCards = [
  { imgSrc: image1, title: 'KMPDU'},
  { imgSrc: image2, title: 'NHIF' },
  { imgSrc: image3, title: 'Phamarcy' },
  { imgSrc: image4, title: 'Hippa' },
  { imgSrc: image5, title: 'Healthcare' },
  { imgSrc: image6, title: 'KMPDC' }
];

const SmallCardContainer = () => {
    return (
      <div>
        <p className="paragraph">
        We are Compliant & Trusted
        </p>
        <div className='small-card-container'>
          {smallCards.map((card, index) => (
            <div key={index} className='small-card'>
              <img src={card.imgSrc} alt={card.title} />
              <h3 className='faded-title'>{card.title}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  };
export default SmallCardContainer;
