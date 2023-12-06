import React from "react";
import { useSpring, animated } from "react-spring";
import "./style.css";
import img from '../../assets/products/paymentSucess.jpg'

const PaymentSuccess = () => {
  return (
    <div className="payment-success-container">
      <div className="card2">
        <h1>Order Placed </h1>
      </div>

      <div className="card2">
        <h3>Payment Successful ! </h3>
      </div>
      
      <div className="card3">
        <img className="i" src={img} alt="image" />
      </div>

      <div className="card2">
        <h3> IF NOT Please fill your email to get offers and product launches </h3>
        <p> The receipts of the orders will be delievered to email </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
