import { AppDataSource } from '../../../../ormconfig.ts';
import * as orderAndFeedbackService from '../../../../monolithOrderAndFeedback/OrderAndFeedbackService.ts';
import * as orderAndFeedbackRepository from '../../../../monolithOrderAndFeedback/OrderAndFeedbackRepository.ts';
import { ObjectId } from 'mongodb';
import { getAllOrdersMockOrder1, getAllOrdersMockOrder2 } from '../../../mocks/orderMocksDB.ts';
import { Order } from '../../../../monolithOrderAndFeedback/Order.ts';
import { Feedback } from '../../../../monolithOrderAndFeedback/Feedback.ts';

describe('get average rating', () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
    });

    let dummyOrder: Order | null;

    beforeEach(async () => {
        // Declare the variables once
        let customerID, restaurantID, address, totalPrice, orderItemList, timestamp;

        // Assign values from getAllOrdersMockOrder1
        ({ customerID, restaurantID, orderItemList, address, totalPrice, timestamp } = getAllOrdersMockOrder1);

        dummyOrder = await orderAndFeedbackService.createOrder(
            customerID,
            restaurantID,
            orderItemList,
            address,
            totalPrice,
            timestamp
        );

        // Assign values from getAllOrdersMockOrder2
        ({ customerID, restaurantID, orderItemList, address, totalPrice, timestamp } = getAllOrdersMockOrder2);

        await orderAndFeedbackService.createOrder(
            customerID,
            restaurantID,
            orderItemList,
            address,
            totalPrice,
            timestamp
        );
    });

    afterEach(async () => {
        const repository = AppDataSource.getRepository(Order);
        await repository.delete({}); //Deletes all documents in the collection
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it('should succeed getting average rating', async () => {
        const orderRepository = AppDataSource.getMongoRepository(Order);

        if (!dummyOrder?._id) throw new Error('Order was not created!');

        const feedbackData = {
            foodRating: 5,
            overallRating: 4,
            deliveryRating: 3,
            orderId: dummyOrder._id,
        };

        const feedback = await orderAndFeedbackRepository.createFeedbackAndLinkOrder(feedbackData);

        dummyOrder = {
            ...(dummyOrder as Order),
            status: 3,
            employeeID: new ObjectId('672df427f54107237ff75569'),
            feedbackID: feedback._id,
        };

        const order = await orderRepository.save(dummyOrder);

        if (!order.employeeID) throw new Error('Order was not created!');

        const avgRating = await orderAndFeedbackRepository.getRatingAVG(new ObjectId(order?._id.toString()));

        expect(avgRating).not.toBeNull();
        expect(avgRating).toEqual(4);
    });

    it('should fail to find order', async () => {
        const orderRepository = AppDataSource.getMongoRepository(Order);
        jest.spyOn(orderRepository, 'findOne').mockResolvedValue(null);

        if (!dummyOrder?._id) throw new Error('Order was not created!');

        const wrongID = '672df427f54107237ff75569';

        await expect(orderAndFeedbackRepository.getRatingAVG(new ObjectId(wrongID))).rejects.toThrow(
            `Order with ID ${wrongID} not found`
        );

        jest.restoreAllMocks();
    });

    it('should fail to find feedback connected to order', async () => {
        const feedbackRepository = AppDataSource.getMongoRepository(Feedback);
        const orderRepository = AppDataSource.getMongoRepository(Order);
        dummyOrder = {
            ...(dummyOrder as Order),
            feedbackID: new ObjectId('672df427f54107237ff75569'),
        };
        await orderRepository.save(dummyOrder);

        jest.spyOn(feedbackRepository, 'findOne').mockResolvedValue(null);

        if (!dummyOrder?._id) throw new Error('Order was not created!');

        await expect(orderAndFeedbackRepository.getRatingAVG(new ObjectId(dummyOrder?._id))).rejects.toThrow(
            `Feedback with ID ${dummyOrder?.feedbackID} not found`
        );

        jest.restoreAllMocks();
    });

    it('should fail to find feedback connected to order', async () => {
        const feedbackRepository = AppDataSource.getMongoRepository(Feedback);
        const orderRepository = AppDataSource.getMongoRepository(Order);
        dummyOrder = {
            ...(dummyOrder as Order),
            feedbackID: new ObjectId('672df427f54107237ff75569'),
        };
        await orderRepository.save(dummyOrder);

        jest.spyOn(feedbackRepository, 'findOne').mockResolvedValue({
            _id: new ObjectId('672df427f54107237ff75569'),
            foodRating: 5,
            deliveryRating: 3,
            overallRating: null as unknown as number,
        });

        if (!dummyOrder?._id) throw new Error('Order was not created!');

        await expect(orderAndFeedbackRepository.getRatingAVG(new ObjectId(dummyOrder?._id))).rejects.toThrow(
            `Feedback ratings are incomplete for feedback #${dummyOrder?.feedbackID}`
        );

        jest.restoreAllMocks();
    });
});
