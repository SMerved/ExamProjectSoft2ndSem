import * as orderAndFeedbackService from '../../../monolithOrderAndFeedback/orderAndFeedbackService.ts';
import request from 'supertest';
import app from '../../../index.ts';

jest.mock('../../../monolithOrderAndFeedback/OrderAndFeedbackService.ts');

describe('Post /create', () => {
    const mockOrder = {
        _id: 'someObjectId',
        userID: 1,
        restaurantID: 2324,
        menuItems: [1, 23, 24],
        address: 11,
        totalPrice: 50
    };

    beforeEach(() => {
        jest.resetAllMocks()
    });

    it('should return order object if order creation is successful', async () => {
        (orderAndFeedbackService.createOrder as jest.Mock).mockResolvedValue(
            mockOrder
        );

        const response = await request(app)
            .post('/createOrder')
            .send({
                userID: 1,
                restaurantID: 2324,
                menuItems: [1, 23, 24],
                address: 11,
                totalPrice: 50
            });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockOrder);
    });

    it('should return 401 error if order creation is unsuccessful', async () => {
        (orderAndFeedbackService.createOrder as jest.Mock).mockResolvedValue(
            null
        );

        const response = await request(app)
            .post('/createOrder')
            .send({
                userID: 1,
                restaurantID: 2324,
                menuItems: [1, 23, 24],
                address: 11,
                totalPrice: 50
            });

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ error: 'Invalid order data' });
    });
});
