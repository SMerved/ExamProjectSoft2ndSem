export interface Order {
    _id: string;
    customerID: string;
    restaurantID: string;
    status: number;
    address: {
        _id: string;
        street: string;
        city: string;
        postalCode: number;
    };
    totalPrice: number;
    feedbackID: string;
    timestamp: string;
}
