import { GetAcceptedOrdersAPI } from '../api/orders';

describe('getAcceptedOrders function', () => {
    it('should return list of accepted Orders', async () => {
        const orders = await GetAcceptedOrdersAPI();
        expect(orders).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    _id: '67360b71cad44b305eb918a2',
                    address: {
                        _id: '672df786f54107237ff75574',
                        city: 'Aarhus',
                        postalCode: '8000',
                        street: 'Birch Avenue 43',
                    },
                    customerID: '672df427f54107237ff75565',
                    feedbackID: '67360b71cad44b305eb918a3',
                    orderItemList: [
                        '672de8c4f54107237ff75546',
                        '672de8c4f54107237ff75547',
                        '672de8c4f54107237ff75548',
                    ],
                    restaurantID: '67360b71cad44b305eb9189d',
                    status: 2,
                    timestamp: '2024-11-14T14:38:41.666Z',
                    totalPrice: 50,
                }),
            ])
        );
    });
});
