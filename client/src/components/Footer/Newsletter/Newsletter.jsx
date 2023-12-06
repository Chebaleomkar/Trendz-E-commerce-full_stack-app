    import React, { useState , useContext } from "react";
    import {
        FaFacebookF,
        FaTwitter,
        FaInstagram,
        FaLinkedinIn,
    } from "react-icons/fa";
    import "./Newsletter.scss";
    import { Context } from "../../../utils/Context";
    const Newsletter = () => {
        const { email , setEmail  } = useContext(Context)

        const handleFormSubmit = (e) => {
            e.preventDefault();
            localStorage.setItem('userEmail', email);
            alert('Email successfully stored!');
        };
        
        const handleEmailChange = (e) => {
            const newEmail = e.target.value;
            setEmail(newEmail);
          };
          
    

        return (
            <div className="newsletter-section">
                <div className="newsletter-content">
                    <span className="small-text">Newsletter</span>
                    <span className="big-text">
                        Sign up for latest updates and offers
                    </span>

                    <div className="form" >
                    <input value={email} onChange={handleEmailChange} type="email" placeholder="Email Address" />
                    <button type="submit" >Subscribe</button>
                    </div>
                
                    <span className="text">
                        Will be used in accordance with our Privacy Policy
                    </span>
                    <span className="social-icons">
                        <div className="icon">
                            <FaLinkedinIn size={14} />
                        </div>
                        <div className="icon">
                            <FaFacebookF size={14} />
                        </div>
                        <div className="icon">
                            <FaTwitter size={14} />
                        </div>
                        <div className="icon">
                            <FaInstagram size={14} />
                        </div>
                    </span>
                </div>
            </div>
        );
    };

    export default Newsletter;