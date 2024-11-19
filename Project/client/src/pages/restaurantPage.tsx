import { useEffect, useState } from 'react';
import { Order } from '../types/orders';
import { getMenuItemsFromIDsAPI, GetOrdersAPI } from '../api/orders';
import { OrderStatusTextEnum } from '../utilities';
import { MenuItem } from '../types/restaurants';

function RestuarantPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const fetchOrders = async () => {
        try {
            const orders = await GetOrdersAPI();
            setOrders(orders);
        } catch (error) {
            console.error('Error fetching Orders:', error);
        }
    };

    const FetchGetMenuItemsFromIDs = async (iDs: string[]) => {
        try {
            const menuItems = await getMenuItemsFromIDsAPI(iDs);

            setMenuItems(menuItems);
        } catch (error) {
            console.error('Error fetching menuItems:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    async function handleOrderClick(order: Order) {
        try {
            setSelectedOrder(order);

            FetchGetMenuItemsFromIDs(order.orderItemList);
        } catch (error) {
            console.error('Failed to fetch menu items:', error);
        }
    }

    return (
        <div>
            {orders.length > 0 ? (
                <>
                    <div
                        style={{
                            display: 'flex',
                            width: '100%',
                            height: '100vh',
                        }}
                    >
                        <div
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#f0f0f0',
                            }}
                        >
                            {orders.map((order) => (
                                <div
                                    key={order._id}
                                    style={{
                                        border: '1px solid #ddd',
                                        borderRadius: '8px',
                                        padding: '20px',
                                        marginBottom: '20px',
                                        backgroundColor: '#f9f9f9',
                                        boxShadow:
                                            '0 4px 8px rgba(0, 0, 0, 0.1)',
                                        width: '50%',
                                        fontFamily: 'Arial, sans-serif',
                                    }}
                                    onClick={() => {
                                        handleOrderClick(order);
                                    }}
                                >
                                    <div>
                                        <strong>Customer ID:</strong>
                                        {order.customerID.username}
                                    </div>

                                    <div>
                                        <strong>Status:</strong>
                                        {OrderStatusTextEnum(order.status)}
                                    </div>

                                    <div>
                                        <strong>Total Price:</strong> $
                                        {order.totalPrice.toFixed(2)}
                                    </div>

                                    <div>
                                        <strong>Timestamp:</strong>

                                        {new Date(
                                            order.timestamp
                                        ).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div
                            style={{
                                flex: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#e0e0e0',
                            }}
                        >
                            {selectedOrder && (
                                <div
                                    key={selectedOrder._id}
                                    style={{
                                        border: '1px solid #ddd',
                                        borderRadius: '8px',
                                        padding: '20px',
                                        marginBottom: '20px',
                                        backgroundColor: '#f9f9f9',
                                        boxShadow:
                                            '0 4px 8px rgba(0, 0, 0, 0.1)',
                                        maxWidth: '450px',
                                        width: '100%',
                                        fontFamily: 'Arial, sans-serif',
                                    }}
                                >
                                    <div>
                                        <strong>Order ID:</strong>
                                        <p>{selectedOrder._id}</p>
                                    </div>

                                    <div>
                                        <strong>Customer:</strong>
                                        <p>
                                            {`Name - ${selectedOrder.customerID.username}`}
                                        </p>
                                        {selectedOrder.customerID
                                            .phoneNumber && (
                                            <p>
                                                {`Phone number - ${selectedOrder.customerID.phoneNumber}`}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <strong>Address:</strong>
                                        <p>
                                            {`${selectedOrder.address.street}, ${selectedOrder.address.city}, ${selectedOrder.address.postalCode}`}
                                        </p>
                                    </div>

                                    <div>
                                        <strong>Total Price:</strong>
                                        <p>
                                            $
                                            {selectedOrder.totalPrice.toFixed(
                                                2
                                            )}
                                        </p>
                                    </div>

                                    <div>
                                        <strong>Timestamp:</strong>
                                        <p>
                                            {new Date(
                                                selectedOrder.timestamp
                                            ).toLocaleString()}
                                        </p>
                                    </div>

                                    <div>
                                        <div
                                            style={{
                                                display: 'grid',
                                                gap: '1rem',
                                                padding: '1rem',
                                            }}
                                        >
                                            {menuItems.map((menuItem) => (
                                                <div
                                                    key={menuItem._id}
                                                    style={{
                                                        border: '1px solid #ccc',
                                                        borderRadius: '8px',
                                                        padding: '1rem',
                                                    }}
                                                >
                                                    <p
                                                        style={{
                                                            margin: '0.5rem 0',
                                                            fontWeight: 'bold',
                                                            fontSize: '1.2rem',
                                                        }}
                                                    >
                                                        {menuItem.name}
                                                    </p>
                                                    <p
                                                        style={{
                                                            margin: '0.25rem 0',
                                                            color: '#555',
                                                        }}
                                                    >
                                                        <strong>
                                                            Available:
                                                        </strong>{' '}
                                                        {menuItem.availability
                                                            ? 'Yes'
                                                            : 'No'}
                                                    </p>
                                                    <p
                                                        style={{
                                                            margin: '0.25rem 0',
                                                            color: '#555',
                                                        }}
                                                    >
                                                        <strong>Price:</strong>{' '}
                                                        ${menuItem.price}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <h1>There are no accepted orders pending...</h1>
                    <p>Come back later to find tasks to deliver!</p>
                </>
            )}
        </div>
    );
}

export default RestuarantPage;
