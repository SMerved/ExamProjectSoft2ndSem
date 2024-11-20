import { GetAcceptedOrdersAPI } from '../api/orders';
import { ordersMockData } from '../mocks/orders';

describe('getAcceptedOrders function', () => {
    it('should return list of accepted Orders', async () => {
        const orders = await GetAcceptedOrdersAPI();
        expect(orders).toEqual(
            expect.arrayContaining([expect.objectContaining(ordersMockData)])
        );
    });
});
