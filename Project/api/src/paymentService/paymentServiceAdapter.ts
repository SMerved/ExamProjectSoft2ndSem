import axios from 'axios';
import dotenv from 'dotenv';
import { PAYMENT_METHODS } from './types/payment.ts';

dotenv.config();

const port = process.env.PORT;
const BASE_URL = `http://localhost:${port}/paymentService`;

async function paymentServiceValidatePayment(
    price: number,
    customerId: string,
    paymentMethod: PAYMENT_METHODS
): Promise<boolean> {
    try {
        const response = await axios.post(`${BASE_URL}/validatePayment`, {
            price,
            customerId,
            paymentMethod
        });

        return response.status == 200;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export { paymentServiceValidatePayment };
