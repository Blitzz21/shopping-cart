import './shopcard.scss'
import React from 'react';

/**
 * a interface CardProps
 * @description this interface is made to define the shopCard's properties
 * imgSrc - product image
 * title - product title
 * price - product price
 * description- product description
 */
interface CardProps {
  imgSrc: string;
  title: string;
  price: number;
  description: string;
}


/**
  * a ShopCard component
  * @description template for the card for the products
  * a const named 'ShopCard' and specifies that it is a React Functional Component with the props defined by {CardProps} props - the props for the card, it follows the properties of the CardProps Interface
  * returns a div classed as 'itemCard' aad its children:
    * imgSrc - product image
    * title - product title
    * price - product price, the .toFixed(2) means that the number of decimal places is 2, 0.00
    * description - product description
    * and an add to cart button
 */
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