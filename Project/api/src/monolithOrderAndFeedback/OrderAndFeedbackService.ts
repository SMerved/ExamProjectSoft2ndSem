import { Order } from './Order.ts';
import { OrderFactory } from './OrderFactory.ts';
import { ObjectId } from 'mongodb';
import {
    GetAllOrders,
    GetAllAcceptedOrders,
} from './OrderAndFeedbackRepository.ts';
import { OrderItem } from './types/order.ts';
import { KafkaAdapter } from '../adapters/kafkaAdapter.ts';
import MessageBroker from '../adapters/types/types.ts';

async function createOrder(
    customerID: ObjectId,
    restaurantID: ObjectId,
    orderItemList: OrderItem[],
    address: ObjectId,
    totalPrice: number,
    timestamp: Date
): Promise<Order | null> {
    const orderFactory: OrderFactory = new OrderFactory();

    const order = await orderFactory.CreateOrder(
        customerID,
        restaurantID,
        address,
        totalPrice,
        orderItemList,
        timestamp
    );

    const messageBroker: MessageBroker = await new KafkaAdapter(
        'order-service',
        'order-service-group',
        'restaurant_topic'
    );

    await messageBroker.sendEvent('order', order);

    return await order;
}

async function getAllOrders(): Promise<Order[] | null> {
    return GetAllOrders();
}

async function getAllAcceptedOrders(): Promise<Order[] | null> {
    return GetAllAcceptedOrders();
}

export { createOrder, getAllAcceptedOrders, getAllOrders };
