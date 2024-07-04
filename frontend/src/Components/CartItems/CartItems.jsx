import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import { useNavigate } from 'react-router-dom';

const CartItems = () => {
    const {getTotalCartAmount , all_product, cartItems, removeFromCart, createOrder } = useContext(ShopContext);
    const navigate = useNavigate();

    const loadRazorpay = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleCheckout = async () => {
        const res = await loadRazorpay('https://checkout.razorpay.com/v1/checkout.js');

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            return;
        }

        const orderDetails = all_product.filter(product => cartItems[product.id] > 0)
            .map(product => ({
                id: product.id,
                name: product.name,
                image: product.image,
                price: product.new_price,
                quantity: cartItems[product.id]
            }));

        const totalAmount = getTotalCartAmount();
        
        const options = {
            key: 'rzp_test_OCqumbNtDH57c4', // Enter the Key ID generated from the Dashboard
            amount: totalAmount * 100,
            currency: 'INR',
            name: 'DF',
            description: 'Test Transaction',
            handler: async function (response) {
                await createOrder(orderDetails, totalAmount, response.razorpay_payment_id);
                navigate('/orders');
            },
            prefill: {
                name: 'Your Name',
                email: 'your-email@example.com',
                contact: '9999999999'
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr/>
        {/* eslint-disable-next-line */}
        {all_product.map((e)=>{
            if (cartItems[e.id]>0)
                {
                    return <div>
                    <div className="cartitems-format cartitems-format-main">
                        <img src={e.image} alt="" className='carticon-product-icon' />
                        <p>{e.name}</p>
                        <p>₹{e.new_price}</p>
                        <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                        <p>₹{e.new_price*cartItems[e.id]}</p>
                        <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
                    </div>
                    <hr />
                </div>
                }
                return null;
        })}
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Cart Totals</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>SubTotal</p>
                        <p>₹{getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>₹{getTotalCartAmount()}</h3>
                    </div>
                </div>
                <button onClick={handleCheckout}>Proceed To Checkout</button>
            </div>
            <div className="cartitems-promocode">
                <p>If you have a promo code, Enter it here</p>
                <div className="cartitems-promobox">
                    <input type="text" placeholder='promo code' />
                    <button>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartItems