import { Order } from './Order.ts';
import { ObjectId } from 'mongodb';
import { AddOrder } from './orderAndFeedbackRepository.ts';

export class OrderFactory {
    public async CreateOrder(
        customerID: ObjectId,
        restaurantID: ObjectId,
        address: ObjectId,
        totalPrice: number,
        menuItemIDList: ObjectId[]
    ): Promise<Order | null> {
        const order = {
            customerID,
            restaurantID,
            address,
            totalPrice,
            menuItemIDList,
        };

        return await AddOrder(order);
    }
}
