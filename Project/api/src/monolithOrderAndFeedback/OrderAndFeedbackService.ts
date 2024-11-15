import { Order } from './Order.ts';
import { OrderFactory } from './OrderFactory.ts';
import { ObjectId } from 'mongodb';
import { GetAllOrders } from './OrderAndFeedbackRepository.ts';

async function createOrder(
    customerID: ObjectId,
    restaurantID: ObjectId,
    address: ObjectId,
    totalPrice: number,
    menuItemIDList: ObjectId[],
    timestamp: Date
): Promise<Order | null> {
    const orderFactory: OrderFactory = new OrderFactory();

    const order = await orderFactory.CreateOrder(
        customerID,
        restaurantID,
        address,
        totalPrice,
        menuItemIDList,
        timestamp
    );

    return order;
}

async function getAllOrders(): Promise<Order[] | null> {
    return GetAllOrders();
}

export { createOrder, getAllOrders };
