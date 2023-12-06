import "./Cart.scss";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import CartItem from "./CartItem/CartItem";
import { useContext } from "react";
import { Context } from "../../utils/Context";
import {  useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const Cart = ({ visibleCart }) => {
  const { cartSubTotal, cartItems, cartCount , email  } = useContext(Context);
  const navigate = useNavigate();
 

  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  );

  const handlePayment = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        mode: "cors",
        body: JSON.stringify({
          items: [{
            id: 1,
            quantity: cartCount,
            price: cartSubTotal,
            name: 'itemsName'
          }]
        }),
      });
  
      const data = await res.json();
  
      // Check if the 'url' property is present in the response
      if (data && data.url) {
        // Redirect to the Stripe Checkout URL
        window.location.href = data.url;
      } else {
        console.error('Invalid response format:', data);
      }
      await sendEmail();
  
    } catch (err) {
      console.error('Error:', err);
    }
  }

  const sendEmail = async ()=>{
    try {
      const res = await axios.post('http://localhost:8000/api/email', {
        email,
        cartSubTotal,
        cartItems,
      });

      // console.log('Email response:', res.data);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
  
  

  return (
    <div className="cart-panel">
      <div className="opac-layer"> </div>
      <div className="cart-content">
        <div className="cart-header">
          <span className="heading">Shopping Cart </span>
          <span className="close-btn" onClick={() => visibleCart(false)}>
            <MdClose /> <span className="text"> Close </span>
          </span>
        </div>

        {!cartItems?.length && (
          <div className="empty-cart">
            <BsCartX />
            <span>No Products in cart </span>
            <button
              className="return-cta"
              onClick={() => {  
                navigate("/");
                visibleCart(false);
              }}
            >
              {" "}
              <FaHome size={30} /> Return to Shop{" "}
            </button>
            
          </div>
        )}

        {!!cartItems?.length && (
          <>
            <CartItem />

            <div className="cart-footer">
              <div className="subtotal">
                <span className="text">Subtotal : </span>
                <span className="text total"> &#8377;{cartSubTotal}</span>
              </div>
              <div className="button">
                <button className="checkout-cta" onClick={handlePayment}>
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;