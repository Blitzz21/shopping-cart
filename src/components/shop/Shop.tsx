  /**
  * imports the Product Images from the './src/shop/product_img/index.ts
  * imports the stylesheet
  * imports the 'ShopCard' component
 */
import { Product1, Product2, Product3, Product4, Product5, Product6, Product7, Product8 } from './product_img';
import './shop.scss';
import ShopCard from './shopcard/shopcard';
 

  /**
 * a component named 'Shop'
 * @description this where the 'shopCards''s component go
 * displays the Main container
 * displays the grid for the format of the 'shopCards'
    *each ShopCard has it's own imgSrc, title,price, and description
 */
function Shop (){
    return (
        <div className='Shop__Main'>
            <div className='Shop__Grid'>
                <ShopCard 
                    key= {1}
                    imgSrc={Product1}
                    title='GTX 1660 Super'
                    price={150.00}
                    description='A fast and powerful graphics card'
                />

                <ShopCard 
                    key= {2}
                    imgSrc={Product2}
                    title='RTX 4090'
                    price={300.00}
                    description='A fast and powerful graphics card'
                />

                <ShopCard
                    key= {3}
                    imgSrc={Product3}
                    title='RTX 3080'
                    price={199.99}
                    description='A fast and powerful graphics card'
                />

                <ShopCard 
                    key= {4}
                    imgSrc={Product4}
                    title='GTX 1080TI'
                    price={120.00}
                    description='A fast and powerful graphics card'
                />

                <ShopCard 
                    key= {5}
                    imgSrc={Product5}
                    title='GTX 1050TI'
                    price={82.59}
                    description='A fast and powerful graphics card'
                />

                <ShopCard 
                    key= {6}
                    imgSrc={Product6}
                    title='RTX 2080TI'
                    price={132.20}
                    description='A fast and powerful graphics card'
                />

                <ShopCard 
                    key= {7}
                    imgSrc={Product7}
                    title='GTX 1660'
                    price={93.49}
                    description='A fast and powerful graphics card'
                />

                <ShopCard 
                    key= {8}
                    imgSrc={Product8}
                    title='GTX 980'
                    price={200.00}
                    description='A fast and powerful graphics card'
                />
            </div>
        </div>
    )
};

export default Shop;