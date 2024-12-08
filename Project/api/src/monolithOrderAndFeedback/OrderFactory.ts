import { Order } from './Order.ts';
import { ObjectId } from 'mongodb';
import { AddOrder } from './OrderAndFeedbackRepository.ts';
import { OrderItem } from './types/order.ts';

export class OrderFactory {
    public async CreateOrder(
        customerID: ObjectId,
        restaurantID: ObjectId,
        address: ObjectId,
        totalPrice: number,
        orderItemList: OrderItem[],
        timestamp: Date
    ): Promise<Order | null> {


        orderItemList = orderItemList.map((item) => {
            return {
                menuItemID: new ObjectId(item.menuItemID),
                quantity: item.quantity,
            }
        });

        const order = {
            customerID: new ObjectId(customerID),
            restaurantID: new ObjectId(restaurantID),
            address,
            totalPrice,
            orderItemList,
            timestamp,
            status: 0
        };

        return await AddOrder(order);
    }
}
