import express from 'express';
import { StripePaymentStrategy } from './stripePaymentServiceAdapter.ts';
import { MockPaypalStrategy } from './mockPaypalService.ts';
import { PaymentProcessor } from './paymentProcessor.ts';
import { PaymentCredentials } from './types/payment.ts';

const paymentRouter = express.Router();

paymentRouter.post('/validatePayment', async (req, res) => {
    try {
        const paymentCredentials: PaymentCredentials = req.body;
        const { price, customerId, paymentMethod } = paymentCredentials;

        let selectedStrategy;
        switch (paymentMethod) {
            case 'stripe':
                selectedStrategy = new StripePaymentStrategy();
                break;
            case 'paypal':
                selectedStrategy = new MockPaypalStrategy();
                break;
            default:
                selectedStrategy = new StripePaymentStrategy();
        }

        const paymentProcessor = new PaymentProcessor(selectedStrategy);

        // Process the payment
        const response = await paymentProcessor.processPayment(price, customerId);

        if (response) {
            res.status(200).json({
                message: 'Payment was successfully validated',
            });
        } else {
            res.status(400).json({
                message: 'Failed to validate payment',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error validating payment' });
    }
});

export { paymentRouter };
