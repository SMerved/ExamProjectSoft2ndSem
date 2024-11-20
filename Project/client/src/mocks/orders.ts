export const ordersMockData = {
    _id: '673de997fa60e0a917658809',
    customerID: '672df427f54107237ff75565',
    restaurantID: '672de88ff54107237ff75565',
    status: 2,
    address: {
        _id: '672df723f54107237ff75573',
        street: 'Maple Street 12',
        city: 'Copenhagen',
        postalCode: '1001',
    },
    totalPrice: 50,
    orderItemList: [
        {
            menuItemId: '672de8c4f54107237ff75546',
            quantity: 2,
        },
        {
            menuItemId: '672de8c4f54107237ff75547',
            quantity: 3,
        },
        {
            menuItemId: '672de8c4f54107237ff75548',
            quantity: 1,
        },
    ],
    timestamp: '2024-11-20T12:00:00.000Z',
};
export const ordersMockData2 = {
    _id: '673de997fa60e0a917658804',
    customerID: '672df427f54107237ff75565',
    restaurantID: '672de88ff54107237ff75565',
    status: 3,
    address: {
        _id: '672df723f54107237ff75573',
        street: 'Maple Street 12',
        city: 'Aarhus',
        postalCode: '1001',
    },
    totalPrice: 50,
    orderItemList: [
        {
            menuItemId: '672de8c4f54107237ff75546',
            quantity: 2,
        },
        {
            menuItemId: '672de8c4f54107237ff75547',
            quantity: 3,
        },
        {
            menuItemId: '672de8c4f54107237ff75548',
            quantity: 1,
        },
    ],
    timestamp: '2024-11-20T12:00:00.000Z',
};

export const ordersMockDataList = [ordersMockData, ordersMockData2];
