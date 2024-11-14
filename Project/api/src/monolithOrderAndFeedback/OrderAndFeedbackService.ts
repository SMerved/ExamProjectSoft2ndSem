import { Order } from './Order.ts';
import { OrderFactory } from './OrderFactory.ts';
import { ObjectId } from 'mongodb';
import { GetAllOrders } from './OrderAndFeedbackRepository.ts';

async function createOrder(
    customerID: ObjectId,
    restaurantID: ObjectId,
    items: ObjectId[],
    address: ObjectId
): Promise<Order | null> {
    const orderFactory: OrderFactory = new OrderFactory();

    const order = await orderFactory.CreateOrder(
        customerID,
        restaurantID,
        items,
        address
    );

    return order;
}

async function getAllOrders(): Promise<Order[] | null> {
    return GetAllOrders();
}

export { createOrder, getAllOrders };
