import { Order } from './Order.ts';
import { ObjectId } from 'mongodb';

export class OrderFactory {
    public CreateOrder(customerID: ObjectId, restaurantID: ObjectId, items: ObjectId[], address: ObjectId): Order {
        const order = new Order();

        order.customerID = customerID;
        order.restaurantID = restaurantID;
        order.menuItemIDList = items;
        order.address = address;

        return order;
    }
}