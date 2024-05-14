import './checkout.scss'

/**
 * a component named 'Checkout'
 * @description this displays the checkout section of the sidebar
 * JSX element container the:
    * pay-container - the container for the checkout
    * pay-total - shows the total
    * pay-button - proceeds to the payment channel
 */
const Checkout = () => {
  return (
    <div className='pay-container'>
        <hr />
        <h3 className='pay-total'>Total: $ 0.00</h3>
        <div className='pay-button'>
            <button>Pay with Paypal</button>
        </div>
    </div>
  )
}

export default Checkout