import './shopcard.scss'
import React from 'react';

interface CardProps {
  imgSrc: string;
  title: string;
  price: number;
  description: string;
}

const shopCard: React.FC<CardProps> = ({
    imgSrc,
    title,
    price,
    description,
  }) => {
    return (
      <div className='itemCard'>
        <img src={imgSrc} alt={title}/>
        <div>
          <h2>{title}</h2>
          <p>${price.toFixed(2)}</p>
          <p>{description}</p>
          <button>Add to Cart</button>
        </div>
      </div>
    );
  };
export default shopCard;