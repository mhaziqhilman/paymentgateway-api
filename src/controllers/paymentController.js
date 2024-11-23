// export const processPayment = async (req, res) => {
//     const { cardNumber, expiryDate, cvv, amount } = req.body;
  
//     // Basic validation
//     if (!cardNumber || !expiryDate || !cvv || !amount) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }
  
//     try {
//       // Simulate payment processing logic
//       console.log(`Processing payment: ${amount} for card ${cardNumber}`);
  
//       // Placeholder response
//       res.status(200).json({ message: 'Payment processed successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Payment processing failed' });
//     }
//   };

// src/controllers/paymentController.js
import db from '../config/db.js';  // Import the database connection

export const processPayment = async (req, res) => {
    const { 
      cardNumber, 
      cardName, 
      expiryDate, 
      cvv, 
      email, 
      address, 
      city, 
      postalCode, 
      country, 
      amount 
    } = req.body;
  
    // Basic validation for required fields
    if (!cardNumber || !cardName || !expiryDate || !cvv || !email || !address || !city || !postalCode || !country || !amount) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    // Optionally, validate the credit card number, expiry date, etc.
    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
      return res.status(400).json({ message: 'Invalid card number' });
    }
  
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      return res.status(400).json({ message: 'Invalid expiry date format' });
    }
  
    if (cvv.length !== 3 || isNaN(cvv)) {
      return res.status(400).json({ message: 'Invalid CVV' });
    }
  
    // Simulate payment processing logic
    try {
      // Insert the payment details into the database
      const query = `
        INSERT INTO payments (cardName, cardNumber, expiryDate, cvv, email, address, city, postalCode, country, amount)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      const values = [cardName, cardNumber, expiryDate, cvv, email, address, city, postalCode, country, amount];
  
      // Use the db connection to execute the query
      db.query(query, values, (err, result) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ message: 'Failed to save payment data' });
        }
        
        console.log('Payment saved with ID:', result.insertId);
        
        // Send success response with payment data
        res.status(200).json({
          message: 'Payment processed successfully!',
          paymentDetails: {
            cardName,
            cardNumber: cardNumber.substring(0, 4) + '****' + cardNumber.substring(12), // Masked card number
            expiryDate,
            amount,
            email,
            address,
            city,
            postalCode,
            country
          }
        });
      });
  
    } catch (error) {
      console.error('Payment processing error:', error);
      res.status(500).json({ message: 'Payment processing failed' });
    }
  };
  
  export default { processPayment };