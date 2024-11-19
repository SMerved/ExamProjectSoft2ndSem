import { AppDataSource } from '../ormconfig.ts';
import { getAddress } from '../RestaurantService/dbFunctions.ts';
import { Feedback } from './Feedback.ts';
import { Order } from './Order.ts';
import { FeedbackData } from './types/feedback.ts';
import { OrderData } from './types/order.ts';

const orderRepository = AppDataSource.getMongoRepository(Order);

const feedbackRepository = AppDataSource.getMongoRepository(Feedback);

async function AddOrder(order: OrderData): Promise<Order | null> {
    if (!order) return null;

    const orderPersist = orderRepository.create(order);

    return orderRepository.save(orderPersist);
}

async function GetAllOrders(): Promise<Order[] | null> {
    try {
        const orders = await orderRepository.find();
        return orders;
    } catch (error) {
        console.error('Error fetching orders:', error);
        return null;
    }
}

async function GetAllAcceptedOrders(): Promise<Order[] | null> {
    try {
        const acceptedOrders = await orderRepository.find({
            where: { status: 2 },
        });

        const acceptedOrderList: Order[] = [];

        for (const acceptedOrder of acceptedOrders) {
            console.log('1. ', acceptedOrder);

            const address = await getAddress(acceptedOrder);

            console.log(address);

            const acceptedOrderTemp = {
                ...acceptedOrder,
                address: address || acceptedOrder.address,
            };

            acceptedOrderList.push(acceptedOrderTemp);
        }

        return acceptedOrderList;
    } catch (error) {
        console.error('Error fetching orders:', error);
        return null;
    }
}

async function createFeedbackAndLinkOrder({
    foodRating,
    overallRating,
    deliveryRating,
    orderId,
}: FeedbackData) {
    return await AppDataSource.manager.transaction(
        async (transactionalEntityManager) => {
            const feedback = transactionalEntityManager.create(Feedback, {
                foodRating,
                overallRating,
                deliveryRating,
            });

            await transactionalEntityManager.save(feedback);

            await transactionalEntityManager.update(
                Order,
                { _id: orderId },
                { feedbackID: feedback._id }
            );

            return feedback;
        }
    );
}

/*async function GetAllOrders(): Promise<Order[] | null> {
    try {
        const orders = await orderRepository.find();

        const menuItemIds = orders.flatMap(order => order.orderItemList.map(item => item.menuItemId));

        const menuItems = await menuItemRepository.find({
            where: {
                _id: { $in: menuItemIds.map(id => id) }
            }
        });

        const menuItemMap = new Map(menuItems.map(item => [item._id.toHexString(), item]));

        for (const order of orders) {
            order.orderItemList = order.orderItemList.map(item => ({
                ...item,
                menuItem: menuItemMap.get(item.menuItemId.toHexString()),
            }));
        }

        return orders;
    } catch (error) {
        console.error("Error fetching orders:", error);
        return null;
    }
}*/

export {
    AddOrder,
    GetAllAcceptedOrders,
    createFeedbackAndLinkOrder,
    feedbackRepository,
    orderRepository,
    GetAllOrders,
};
