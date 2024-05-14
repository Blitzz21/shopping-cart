  /**
   * imports the stylesheet
   * imports the 'Checkout' component
 */
import './navbar.scss'
import Checkout from './checkout/checkout';

/**
 * a component named 'Navbar'
 * @description this displays the navbar and the sidebar
 * returns the JSX elements
 */

function Navbar ()  {


/**
 * a function  name showSideBar that returns no value or void
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
 * a function  name hideSideBar that returns no value or void
 * @description this fucntion is made to hide the sidebar when the user clicks the X button
 * a const named sidebar to assign the document.querySelector('.sidebar), and the declared it's type as an HTMLElement or null
 * if the sidebar with a class of sidebar is found
 * the display style of the class will change to none to show the sidebar
 */
  function hideSidebar(): void {
    const sidebar: HTMLElement | null = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.style.display = 'none';
    }
  }

  return (
  <div className='Navbar'>
    <nav>
      <ul className='sidebar'>
        <li onClick={hideSidebar}><a>Close</a></li>
        <li><Checkout/></li>
      </ul>

      <ul className='navbar'>
        <li><a href="">Spartan Parts</a></li>
        <li className='hideOnMobile'><a>Shop</a></li>
        <li onClick={showSidebar} className='cart-button'><a><svg xmlns="http://www.w3.org/2000/svg" className='icon' fill='#1f1f1f' height="26" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg></a></li>
      </ul>
    </nav>
  </div>
  )
}

export default Navbar
