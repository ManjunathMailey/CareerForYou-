const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Payment route
app.post('/charge', async (req, res) => {
    try {
        const { amount, currency, source, description } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            description,
            payment_method: source,
            confirm: true,
        });

        // If payment is successful
        res.status(200).json({ message: 'Payment successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Payment failed' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
