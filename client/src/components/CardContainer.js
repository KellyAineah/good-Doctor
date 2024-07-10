import React from 'react';
import Card from './Card';



const CardContainer = () => {
  const cards = [
    {
        title: 'Unlimited Virtual Consultation (UVC)',
        content: 'This is a virtual outpatient consultation offered by goodDoctor. Enjoy unlimited consultations with our medical experts at affordable pre-payments. Get discounts on medications, with no age limits and no hidden charges. Purchase Unlimited Virtual Medical Consultation with generalists and some specialists for the whole year from 995 Ksh.'
    },
    {
        title: 'Family Health Program',
        content: 'Our Family Health Program provides comprehensive outpatient services for families with 4 members or more. Enjoy affordable prepayments and comprehensive outpatient services from goodDoctor, ensuring your entire family’s health is taken care of.'
    },
    {
        title: 'Corporate Health Program',
        content: 'goodDoctor offers a Corporate Health Program for businesses. Ensure your employees receive comprehensive outpatient services at affordable prepayments. Boost productivity and employee satisfaction by providing quality healthcare.'
    },
    {
        title: 'Senior Care Program',
        content: 'Our Senior Care Program allows individuals over the age of 50 to access unlimited virtual medical consultations via the goodDoctor app. As medical check-ups become more frequent with age, ensure you have access to affordable and reliable healthcare services.'
    }
];
  
    return (
      <div className="card-container">
        {cards.map((card, index) => (
          <Card key={index} title={card.title} content={card.content} />
        ))}
      </div>
    );
  };
export default CardContainer
