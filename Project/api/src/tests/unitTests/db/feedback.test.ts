import { AppDataSource } from '../../../ormconfig.ts';
import * as orderAndFeedbackService from '../../../monolithOrderAndFeedback/orderAndFeedbackService.ts';
import { ObjectId } from 'mongodb';
import { createFeedbackAndLinkOrder, orderRepository } from '../../../monolithOrderAndFeedback/orderAndFeedbackRepository.ts';

describe('Database Functionality for createFeedbackAndLinkOrder', () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it('should create feedback and link it to the correct order', async () => {
        const mockOrder = {
            customerID: new ObjectId(),
            restaurantID: new ObjectId(),
            address: new ObjectId(),
            totalPrice: 50,
            menuItems: [new ObjectId(), new ObjectId(), new ObjectId()]
        };

        const order = await orderAndFeedbackService.createOrder(mockOrder.customerID, mockOrder.restaurantID, mockOrder.address, mockOrder.totalPrice, mockOrder.menuItems);

        if (!order) {
            throw new Error('Order creation failed, cannot proceed with feedback creation');
        }

        const feedbackData = {
            foodRating: 5,
            overallRating: 4,
            deliveryRating: 3,
            orderId: order._id,
        };

        const feedback = await createFeedbackAndLinkOrder(feedbackData);

        expect(feedback).not.toBeNull();
        expect(feedback.foodRating).toBe(feedbackData.foodRating);
        expect(feedback.overallRating).toBe(feedbackData.overallRating);
        expect(feedback.deliveryRating).toBe(feedbackData.deliveryRating);

        const updatedOrder = await orderRepository.findOneBy({ _id: order._id });
        expect(updatedOrder?.feedbackID).toStrictEqual(feedback._id);
    });
});
