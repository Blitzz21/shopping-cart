  /**
   * imports the stylesheet for main and the checkout
   * imports the Product Images
   * imports useDispatch and UseSelector from Redux
   * imports RootState from redux/store
   * imports the cartQuantitySlice and its components named decreaseCartQuantity, increaseCartQuantity, and resetCartQuantity from the redux folder
   * imports useState and useEffect
   * imports the PayPal Payment Method
   * imports two interfaces from types folder
 */
import './main.scss';
import './checkout.scss'
import { Product1, Product2, Product3, Product4, Product5, Product6, Product7, Product8 } from '../shop/product_img';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { decreaseCartQuantity, increaseCartQuantity, resetCartQuantity } from '../redux/cartQuantitySlice';
import { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { ShopCardProps } from '../types/type';
import { CartItemProps } from '../types/type';

/**
 * a component named 'Main'
 * @description this displays the navbar, sidebar and checkout
 * returns the JSX elements
 */
function Main ()  {
const cartQuantity = useSelector((state: RootState) => state.cartQuantity.value);
const dispatch = useDispatch();

/**
 * 2 const with useState hook
 * @description this displays the navbar, sidebar and checkout
 * the first const, the state variable and the updater of the state it sets the intial state of the cartItemsProps as an empty array
 * second const, the state variable and the updater of the state it sets the initial state of the totalPrice to be 0
 */
const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
const [totalPrice, setTotalPrice] = useState<number>(0);


/**
 * a function named calculateTotalPrice
 * @description for calculating the total price of the CartItems
 * initialize with the total = 0 
 * for each cartItem with the Prop item
 * total is updated by the item.price * item.itemQuantity
 * then setTotalPrice to the total calculated
 */
const calculateTotalPrice = () => {
  let total = 0;
  cartItems.forEach((item) => {
    total += item.price * item.itemQuantity;
  });
  setTotalPrice(total);
};


/**
 * My PayPal Client ID
 * @description for connecting my PayPal Sandbox Account
 */
const payPalClientId = "Aa4HHwPu06PJSvxkfOUssvPtueg22Ycg5_ASo9lS9Lwjl3J9KEeemzr4tkRwq___cQHBcvym2yHA8m1m";


/**
 * a function named createOrder
 * @description when you press the PayPal button this processess the request
 * that takes two parameters data and actions with their type set to any
 * adds up the prices of the cartItems array by calculating the total and the item.price and item.itemQuantity, and the initial value is 0
 */
const createOrder = (actions: any): Promise<string> => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.itemQuantity, 0);

/**
 * for error handling
 * if the totalPrice is less than or equal to zero it returns an error
 */
  if (totalPrice <= 0) {
    return Promise.reject(new Error('Total price must be greater than zero.'));
  }


/**
 * a method called to create and order with PayPal
 * @description order creation process
 * then passes an object which is an array
 * and then passes another object with a value and a currency code
 * after the purchase_units if the order creation is succesful the orderId is returned
 * if there is an error in the order creation console error will be made
*/
  return actions.order.create({
    purchase_units: [
      {
        amount: {
          value: totalPrice.toFixed(2),
          currency_code: "USD",
        },
      },
    ],
  }).then((orderId: string) => {
    return orderId;
  }).catch((err: any) => {
    console.error('Failed to create PayPal order:', err);
    throw err;
  });
};


/**
 * a function named onApprove
 * @description after the order creation the transaction will be approved
 * the return captures the payment for the approved order and then the details will be passed to the capture
 * logs the transaction
 * if the capture is completed the cartItems and the cartQuantity will be reset
 */
const onApprove = (actions: any) => {
  return actions.order.capture().then((details: any) => {
    const captureData = details.purchase_units[0].payments.captures[0];
    console.log(`Transaction ${captureData.status}: ${captureData.id}`);
    if (captureData.status === 'COMPLETED') {
      setCartItems([]);
      dispatch(resetCartQuantity());
    }
  });
};


/**
 * a hook for calling the calculation of the totalPrice from the cartItems array
 */
useEffect(() => {
  calculateTotalPrice();
}, [cartItems]);


/**
 * a function named addToCart
 * checks first if the item has already been added to the cart by checking CartitemIndex
 * then the item.title from the ShopCardProps becomes the cartItem.title 
 * 
 * if the item already exist in the cart it just increments the itemQuantity
 * if not the item will be added and gets the interface of CartItemProps and assigns to the newCartItem
 * with a unique key, but copies the imgSrc, title, price, and itemQuantity's initial quantity is set to 1
 * after that it sets the cartItems with the previously cart item and the newly added cart item
 */
const addToCart = (item: ShopCardProps) => {
  const existingItemIndex = cartItems.findIndex(
    (cartItem) => cartItem.title === item.title
  );

  if (existingItemIndex !== -1) {
    // Item already exists in the cart, increment the quantity
    const updatedCartItems = [...cartItems];
    updatedCartItems[existingItemIndex].itemQuantity += 1;
    setCartItems(updatedCartItems);
    dispatch(increaseCartQuantity());
  } else {
    // Item doesn't exist in the cart, add it
    const newCartItem: CartItemProps = {
      key: Date.now(),
      imgSrc: item.imgSrc,
      title: item.title,
      price: item.price,
      itemQuantity: 1,
    };
    setCartItems((prevCartItems) => [...prevCartItems, newCartItem]);
    dispatch(increaseCartQuantity());
  }
};


/**
 * a function named removeFromCart
 * it first checks if the item is in the cart and if the item is in cart it decrements the quantity if there is more and if not it removes the item from the cart
 */
const removeFromCart = (itemTitle: string) => {
  const existingItemIndex = cartItems.findIndex(
    (cartItem) => cartItem.title === itemTitle
  );
  if (existingItemIndex !== -1) {
    // Item exists in the cart
    const updatedCartItems = [...cartItems];
    const itemPrice = updatedCartItems[existingItemIndex].price;
    const itemQuantity = updatedCartItems[existingItemIndex].itemQuantity;
    dispatch(decreaseCartQuantity())

    if (updatedCartItems[existingItemIndex].itemQuantity > 1) {
      // Decrement the quantity if there are multiple items
      updatedCartItems[existingItemIndex].itemQuantity -= 1;
      setCartItems(updatedCartItems);
      dispatch(decreaseCartQuantity());
      calculateTotalPrice();
    } else {
      // Remove the item from the cart if there's only one
      const removedItemTotal = itemPrice * itemQuantity;
      updatedCartItems.splice(existingItemIndex, 1);
      setCartItems(updatedCartItems);
      dispatch(decreaseCartQuantity());
      setTotalPrice((prevTotalPrice) => prevTotalPrice - removedItemTotal);
    }
  }
};


/**
 * for the ShopCard elemts
 * an ShopCard item to be rendered to the Shop__Grid div
 */
const ShopCard: React.FC<ShopCardProps> = ({
  key,
  imgSrc,
  title,
  price,
  description,
}) => {
  return (
    <div key={key} className='itemCard'>
      <img src={imgSrc} alt={title}/>
      <div>
        <h2>{title}</h2>
        <p>${price.toFixed(2)}</p>
        <p>{description}</p>
        <button onClick={() => addToCart({ key, imgSrc, title, price, description })}>Add to Cart</button>
      </div>
    </div>
  );
};


/**
 * for rendering the cart items whenever the add to cart button is clicked
 * a cartItem with the props of CartItemProps that needs to have key, imgSrc, title, price and itemQuantity
 * a list element is returned that has a unique key and along with its information
 */
const CartItem: React.FC<CartItemProps> = ({
  key,
  imgSrc,
  title,
  price,
  itemQuantity,
}) => {
  return (
    <li className='Cart-Item' key={key}>
      <div>
        <img src={imgSrc} />
      </div>

      <div className='Cart-Item-info'>
        <h2>{title}</h2>
        <p>${price.toFixed(2)}</p>
      </div>

      <div className='Cart-Item-quantity'>
        <button onClick={() => addToCart({ key, imgSrc, title, price, description: '' })}>+</button>
          <p>{itemQuantity}</p>
        <button  onClick={() => removeFromCart(title)}>-</button>
      </div>
    </li>
  )
}



/**
 * a function named showSideBar that returns no value or void
 * @description this fucntion is made to show the sidebar when the user clicks the cart-button
 * a const named sidebar to assign the document.querySelector('.sidebar), and the declared it's type as an HTMLElement or null
 * if the sidebar with a class of sidebar is found
 * the display style of the class will change to flex to show the sidebar
 */
  function showSidebar(): void {
    const sidebar: HTMLElement | null = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.style.display = 'flex';
    }
  }
  
/**
 * a function named hideSideBar that returns no value or void
 * @description this fucntion is made to hide the sidebar when the user clicks the X button
 * a const named sidebar to assign the document.querySelector('.sidebar), and the declared it's type as an HTMLElement or null
 * if the sidebar with a class of sidebar is found
 * the display style of the class will change to none to hide the sidebar
 */
  function hideSidebar(): void {
    const sidebar: HTMLElement | null = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.style.display = 'none';
    }
  }

  return (
<>
  <div className='Navbar'>
    <nav>
    
      <ul className='sidebar'>
        <li onClick={hideSidebar}><a>Close</a></li>
        {cartItems.map((item) => (
              <CartItem
                key={item.key}
                imgSrc={item.imgSrc}
                title={item.title}
                price={item.price}
                itemQuantity={item.itemQuantity}
              />
            ))}
       <li>
            <div className='pay-container'>
              <hr/>
              <h3 className='pay-total'>Total: $ {totalPrice.toFixed(2)}</h3>

              <div className='pay-button'>
                <button>Checkout</button>
                <p>or</p>
              </div>
              <PayPalScriptProvider options={{ clientId: payPalClientId }}>
                {cartItems.length > 0 && (
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                  />
                )}
              </PayPalScriptProvider>
            </div>
        </li>
      </ul>
    

      <ul className='navbar'>
        <li><a href="">Spartan Parts</a></li>
        <li className='hideOnMobile'><a>Shop</a></li>
        <li onClick={showSidebar} className='cart-button'><a><svg xmlns="http://www.w3.org/2000/svg" className='icon' fill='#1f1f1f' height="26" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>({cartQuantity})</a></li>
      </ul>
    </nav>
  </div>


  <div className='Shop__Main'>
    <div className='Shop__Grid'>
      <ShopCard 
        key={1}
        title='GTX 1660 Super'
        imgSrc={Product1}
        price={374.99}
        description= 'A fast and powerful graphics card'
      />

      <ShopCard 
        key={2}
        title='RTX 4090'
        imgSrc={Product2}
        price={17499.99}
        description= 'A fast and powerful graphics card'
      />

      <ShopCard 
        key={3}
        title='RTX 3080'
        imgSrc={Product3}
        price={719.99}
        description= 'A fast and powerful graphics card'
      />

      <ShopCard 
        key={4}
        title='GTX 1080 TI'
        imgSrc={Product4}
        price={699.99}
        description= 'A fast and powerful graphics card'
      />

      <ShopCard 
        key={5}
        title='GTX 1050 TI'
        imgSrc={Product5}
        price={200.00}
        description= 'A fast and powerful graphics card'
      />

      <ShopCard 
        key={6}
        title='RTX 2080 TI'
        imgSrc={Product6}
        price={844.99}
        description= 'A fast and powerful graphics card'
      />

      <ShopCard 
        key={7}
        title='RTX 2080 Super'
        imgSrc={Product7}
        price={600.00}
        description= 'A fast and powerful graphics card'
      />

      <ShopCard 
        key={8}
        title='GTX 980'
        imgSrc={Product8}
        price={300.00}
        description= 'A fast and powerful graphics card'
      />
    </div>
  </div>
</>
  )
}

export default Main;