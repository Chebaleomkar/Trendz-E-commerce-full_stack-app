const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_KEY);
const cors = require('cors');
const nodemailer = require('nodemailer');
const { config } = require('dotenv');


// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Checkout route
app.post('/api/checkout', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: req.body.items.map(item => ({
        price_data: {
          currency: 'inr',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.json({ url: session.url });
  } catch (err) {
    // console.error('Error during checkout:', err);
    res.status(500).json({ error: { message: 'Internal Server Error' } });
  }
});

// Email route
app.post('/api/email', async (req, res) => {
  try {
    const { email, cartSubTotal, cartItems } = req.body;

    // Create a transporter for sending emails
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'omkarchebale0@gmail.com',
        pass: 'mage vdjk uofv ncxg',
      },
    });

    const itemsContent = cartItems.map(item => `
    <b>Product Name:<i> ${item.attributes.title} </i> </b><br/>
    <b>Price: <i> ${item.attributes.price} </i> </b><br/>
    <b>Quantity : <i> ${item.attributes.quantity} </i> </b>
    <br/>
  `).join('');

    // Email content
    const mailOptions = {
      from: 'omkarchebale0@gmail.com',
      to: email,
      subject: 'Trendz : Thanks for purchasing',
      html: `<h1>Thank you for your purchase!</h1><br/><h3>Your total amount is ${cartSubTotal}.</h3><br/><hr/>
        <p>Details: 
         ${itemsContent}
        </p> <hr/><br/> <br/> <br/>
         <b> Visit again  </b>
        `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    // console.error('Error sending email:', error);
    res.status(500).json({ error: { message: 'Internal Server Error' } });
  }
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
