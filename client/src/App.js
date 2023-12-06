import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home/Home'
import Category from './components/Category/Category'
import SingleProduct from './components/SingleProduct/SingleProduct'
import NewsLetter from './components/Footer/Newsletter/Newsletter'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import AppContext from "./utils/Context";
import PaymentSuccess from "./components/paymentsuccess/PaymentSucess.jsx";
import { useState } from "react";

function App() {
    const [email, setEmail] = useState('');

    // Function to handle form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Validate the email (you can add more robust validation)
        if (!email) {
            alert('Please enter a valid email address');
            return;
        }

        // Store the email in localStorage
        localStorage.setItem('userEmail', email);

        // You can redirect the user to another page or perform other actions here
        alert('Email successfully stored!');
    };

    // Check if the user has already entered an email
    const storedEmail = localStorage.getItem('userEmail');

    return (
        <>
            <BrowserRouter>
                <AppContext>
                <Header />
                <Routes>

                    <Route path="/" element={<Home />} />
                    <Route path="/category/:id" element={<Category />} />
                    <Route path="/product/:id" element={<SingleProduct />} />
                    <Route path="/success" element={<PaymentSuccess />} />
                    
                </Routes>
                <NewsLetter />
                <Footer />
            </AppContext>
        </BrowserRouter >
        </>
    )

}

export default App;
