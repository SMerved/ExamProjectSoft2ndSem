import { Order } from './Order.ts';
import { ObjectId } from 'mongodb';
import { AddOrder } from './OrderAndFeedbackRepository.ts';

export class OrderFactory {
    public async CreateOrder(
        customerID: ObjectId,
        restaurantID: ObjectId,
        address: ObjectId,
        totalPrice: number,
        menuItemIDList: ObjectId[],
        timestamp: Date
    ): Promise<Order | null> {
        const order = {
            customerID,
            restaurantID,
            address,
            totalPrice,
            menuItemIDList,
            timestamp,
        };

        return await AddOrder(order);
    }
}
