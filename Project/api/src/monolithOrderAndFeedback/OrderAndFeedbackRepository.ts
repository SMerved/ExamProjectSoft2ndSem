import { AppDataSource } from '../ormconfig.ts';
import { Order } from './Order.ts';
import { Feedback } from './Feedback.ts';

const orderRepository = AppDataSource.getMongoRepository(Order);

async function AddOrder(order: Order): Promise<boolean> {
    if (!order)
        return false;

    const r = orderRepository.create(order);

    return r != null;
}

export {AddOrder}