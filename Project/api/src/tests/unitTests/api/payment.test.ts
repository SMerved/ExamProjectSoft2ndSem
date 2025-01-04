import request from 'supertest';
import app from '../../../index.ts';

jest.mock('../../../adapters/messaging');
jest.mock('../../../adapters/kafkaAdapter');
describe('Post /paymentService/validatePayment', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('Should return 200 status code', async () => {
        const response = await request(app)
            .post('/paymentService/validatePayment')
            .send({
                price: 1000,
                customerId: 'customerId',
                paymentMethod: 'stripe',
            });

        expect(response.status).toBe(200);
    });

    it('Amount too small, should return 400 status code', async () => {
        const response = await request(app)
            .post('/paymentService/validatePayment')
            .send({
                price: 100,
                customerId: 'customerId',
                paymentMethod: 'stripe',
            });

        expect(response.status).toBe(400);
    });

    it('Should use Paypal strategy and return 200 status for any amount', async () => {
        const response = await request(app)
            .post('/paymentService/validatePayment')
            .send({
                price: 1000,
                customerId: 'customerId',
                paymentMethod: 'paypal',
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe(
            'Payment was successfully validated'
        );
    });

    it('Should default to Stripe strategy for unknown payment method', async () => {
        const response = await request(app)
            .post('/paymentService/validatePayment')
            .send({
                price: 1000,
                customerId: 'customerId',
                paymentMethod: 'unknown',
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe(
            'Payment was successfully validated'
        );
    });
});
