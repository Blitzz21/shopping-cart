import { Product1, Product2, Product3, Product4, Product5, Product6, Product7, Product8 } from './product_img'
import './shop.scss'
import ShopCard from './shopcard/shopcard'
 
function Shop (){
    return (
        <div className='Shop__Main'>
            <h1>New Arrivals</h1>
            <div className='Shop__Grid'>
                <ShopCard 
                    imgSrc={Product1}
                    title='GTX 1660 Super'
                    price={200.00}
                    description='A fast and powerful graphics card'
                />

                <ShopCard 
                    imgSrc={Product2}
                    title='RTX 4090'
                    price={200.00}
                    description='A fast and powerful graphics card'
                />

                <ShopCard 
                    imgSrc={Product3}
                    title='RTX 3080'
                    price={200.00}
                    description='A fast and powerful graphics card'
                />

                <ShopCard 
                    imgSrc={Product4}
                    title='GTX 1080TI'
                    price={200.00}
                    description='A fast and powerful graphics card'
                />

                <ShopCard 
                    imgSrc={Product5}
                    title='GTX 1050TI'
                    price={200.00}
                    description='A fast and powerful graphics card'
                />

                <ShopCard 
                    imgSrc={Product6}
                    title='RTX 2080TI'
                    price={200.00}
                    description='A fast and powerful graphics card'
                />

                <ShopCard 
                    imgSrc={Product7}
                    title='GTX 1660'
                    price={200.00}
                    description='A fast and powerful graphics card'
                />

                <ShopCard 
                    imgSrc={Product8}
                    title='GTX 980'
                    price={200.00}
                    description='A fast and powerful graphics card'
                />
            </div>

        </div>
    )
}

export default Shop