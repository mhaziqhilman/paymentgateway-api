// src/server.js
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import paymentRoutes from './routes/paymentRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Basic route to handle GET requests to the root
app.get('/', (req, res) => {
  res.send('Welcome to the Payment Gateway API!');
});

// Use the payment routes
app.use('/api/payment', paymentRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
