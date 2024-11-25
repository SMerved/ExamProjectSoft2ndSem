import { AppDataSource } from '../../../ormconfig.ts';
import * as orderAndFeedbackService from '../../../monolithOrderAndFeedback/OrderAndFeedbackService.ts';
import {
    createFeedbackAndLinkOrder,
    orderRepository,
} from '../../../monolithOrderAndFeedback/OrderAndFeedbackRepository.ts';
import { mockOrderDB } from '../../mocks/feedbackMocksDB.ts';

describe('Database Functionality for createFeedbackAndLinkOrder', () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it('should create feedback and link it to the correct order', async () => {
        const { customerID, restaurantID, address, totalPrice, menuItems, timestamp } = mockOrderDB;

        const order = await orderAndFeedbackService.createOrder(
            customerID,
            restaurantID,
            address,
            totalPrice,
            menuItems,
            timestamp
        );

        if (!order) {
            throw new Error(
                'Order creation failed, cannot proceed with feedback creation'
            );
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

        const updatedOrder = await orderRepository.findOneBy({
            _id: order._id,
        });
        expect(updatedOrder?.feedbackID).toStrictEqual(feedback._id);
    });
});
