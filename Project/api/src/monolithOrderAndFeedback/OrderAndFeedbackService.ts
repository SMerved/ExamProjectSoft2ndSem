import { Order } from './Order.ts';
import { OrderFactory } from './OrderFactory.ts';
import { ObjectId } from 'mongodb';

export class OrderAndFeedbackService {
    public async createOrder(customerID: ObjectId, restaurantID:ObjectId, items: ObjectId[], address: ObjectId): Promise<Order> {
        const orderFactory: OrderFactory = new OrderFactory();

        const order: Order = await orderFactory.CreateOrder(customerID, restaurantID, items, address);

        return order;
    }
}
