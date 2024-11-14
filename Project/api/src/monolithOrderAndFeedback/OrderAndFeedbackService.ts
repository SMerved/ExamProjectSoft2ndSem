import { Order } from './Order.ts';
import { OrderFactory } from './orderFactory.ts';
import { ObjectId } from 'mongodb';

async function createOrder(
    customerID: ObjectId,
    restaurantID: ObjectId,
    address: ObjectId,
    totalPrice: number,
    menuItemIDList: ObjectId[]
): Promise<Order | null> {
    const orderFactory: OrderFactory = new OrderFactory();

    const order = await orderFactory.CreateOrder(
        customerID,
        restaurantID,
        address,
        totalPrice,
        menuItemIDList
    );

    return order;
}

export { createOrder };
