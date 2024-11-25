const timestamp = new Date();

const mockOrderItemList = [
    { menuItemId: 'someObjectId', quantity: 2 },
    { menuItemId: 'someObjectId', quantity: 3 },
    { menuItemId: 'someObjectId', quantity: 1 },
];

export const mockOrder = {
    _id: 'someObjectId',
    userID: 1,
    restaurantID: 2324,
    menuItems: mockOrderItemList,
    address: 11,
    totalPrice: 50,
    timestamp: timestamp.toISOString(),
    status: 1,
};

export const mockOrderPayload = {
    userID: 1,
    restaurantID: 2324,
    menuItems: mockOrderItemList,
    address: 11,
    totalPrice: 50,
    timestamp: timestamp,
}

export const mockOrderReject = {
    _id: 'someObjectId',
    userID: 1,
    restaurantID: 2324,
    menuItems: mockOrderItemList,
    address: 11,
    totalPrice: 50,
    timestamp: timestamp.toISOString(),
    status: 1,
    rejectReason: "Manden bor i indien, der leverer vi skam ik' til",
};

export const mockOrderList = [
    {
        userID: 1,
        restaurantID: 2324,
        menuItems: mockOrderItemList,
        address: 11,
        totalPrice: 50,
        timestamp: timestamp.toISOString(),
        status: 2,
    },
    {
        userID: 1,
        restaurantID: 2324,
        menuItems: mockOrderItemList,
        address: 11,
        totalPrice: 50,
        timestamp: timestamp.toISOString(),
        status: 1,
    },
];