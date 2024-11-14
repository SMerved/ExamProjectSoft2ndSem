import { AppDataSource } from '../ormconfig.ts';
import { Feedback } from './Feedback.ts';
import { Order } from './Order.ts';
import { FeedbackData } from './types/feedback.ts';
import { OrderData } from './types/order.ts';

const orderRepository = AppDataSource.getMongoRepository(Order);

const feedbackRepository = AppDataSource.getMongoRepository(Feedback);

async function AddOrder(order: OrderData): Promise<Order | null> {
    if (!order) return null;

    const orderPersist = orderRepository.create(order);

    return orderRepository.save(orderPersist);
}

async function createFeedbackAndLinkOrder({ foodRating, overallRating, deliveryRating, orderId }: FeedbackData) {
    return await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
        const feedback = transactionalEntityManager.create(Feedback, {
            foodRating,
            overallRating,
            deliveryRating,
        });

        await transactionalEntityManager.save(feedback);

        await transactionalEntityManager.update(
            Order,
            { _id: orderId },
            { feedbackID: feedback._id }
        );

        return feedback;
    });
}


export { AddOrder, createFeedbackAndLinkOrder, feedbackRepository, orderRepository };
