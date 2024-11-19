import { VITE_BASE_URL } from '../constants';
import { Order } from '../types/orders';

const baseUrl = VITE_BASE_URL;

export const GetAcceptedOrdersAPI = async (): Promise<Order[]> => {
    const response = await fetch(`${baseUrl}/acceptedOrders`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
        throw new Error('Failed to login');
    }
    return response.json();
};
