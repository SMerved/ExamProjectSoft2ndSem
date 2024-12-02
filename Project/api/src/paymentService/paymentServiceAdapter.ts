import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;
const BASE_URL = `http://localhost:${port}/paymentService`;

async function paymentServiceValidatePayment(
    price: number,
    customerId: string
): Promise<boolean> {
    try {
        const response = await axios.post(`${BASE_URL}/validatePayment`, {
            price,
            customerId,
        });

        return response.status == 200;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export { paymentServiceValidatePayment };
