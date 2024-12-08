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
                menuItemId: new ObjectId(item.menuItemId),
                quantity: item.quantity,
            }
        });
        
       console.log("OrderFactory.CreateOrder");
       console.log("Orders", orderItemList);
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
