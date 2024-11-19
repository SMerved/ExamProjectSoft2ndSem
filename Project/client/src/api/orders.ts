import { VITE_BASE_URL } from '../constants';
import { Order } from '../types/orders';
import { MenuItem } from '../types/restaurants';

const baseUrl = VITE_BASE_URL;

export const GetOrdersAPI = async (): Promise<Order[]> => {
    const response = await fetch(`${baseUrl}/orders`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
        throw new Error('Failed to login');
    }
    return response.json();
};

export const getMenuItemsFromIDsAPI = async (
    menuItemIds: string[]
): Promise<MenuItem[]> => {
    const response = await fetch(`${baseUrl}/menuItemsFromIds`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(menuItemIds),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch menu items');
    }

    return response.json();
};

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
