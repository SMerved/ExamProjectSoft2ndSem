import { AppDataSource } from '../ormconfig.ts';
import { Order } from './Order.ts';

const orderRepository = AppDataSource.getMongoRepository(Order);

async function AddOrder(order: Order): Promise<Order | null> {
    if (!order) return null;

    return orderRepository.create(order);
}

async function GetAllOrders(): Promise<Order[] | null> {
    try {
        return orderRepository.find();
    } catch (error) {
        return null;
    }
}

export { AddOrder, GetAllOrders };
