import { GetAcceptedOrdersAPI } from '../api/orders';

describe('getAcceptedOrders function', () => {
    it('should return list of accepted Orders', async () => {
        const orders = await GetAcceptedOrdersAPI();
        expect(orders).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    _id: '67360b71cad44b305eb918a2',
                    customerID: '67360b71cad44b305eb9189c',
                    restaurantID: '67360b71cad44b305eb9189d',
                    status: 2,
                    address: {
                        _id: '672df786f54107237ff75574',
                        street: 'Birch Avenue 43',
                        city: 'Aarhus',
                        postalCode: '8000',
                    },
                    totalPrice: 50,
                    feedbackID: '67360b71cad44b305eb918a3',
                    timestamp: '2024-11-14T14:38:41.666Z',
                }),
            ])
        );
    });
});
