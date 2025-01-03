import React, { useEffect, useState } from 'react';
import { Order, MenuItem } from '../../types/orders';
import { Button } from '@mui/material';
import { acceptRejectOrder } from '../../api/orders';
interface Props {
    selectedOrder: Order;
    fetchOrders: () => void;
}

const OrderCardDetailed: React.FC<Props> = ({ selectedOrder, fetchOrders }) => {
    const [rejectReason, setRejectReason] = useState<string>(selectedOrder.rejectReason || '');
    async function handleRejectAcceptOrder(selectedOrder: Order, accept: boolean, rejectReason?: string) {
        try {
            if (accept) {
                await acceptRejectOrder(selectedOrder._id, 2);
            } else await acceptRejectOrder(selectedOrder._id, 1, rejectReason);

            fetchOrders();
        } catch (error) {
            console.error('Failed to fetch menu items:', error);
        }
    }

    function isMenuItem(item: string | MenuItem): item is MenuItem {
        return typeof item === 'object' && item !== null && '_id' in item;
    }

    useEffect(() => {
        setRejectReason(selectedOrder.rejectReason || '');
    }, [selectedOrder]);

    return (
        <div
            key={selectedOrder._id}
            style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: 'lightyellow',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                fontFamily: 'Arial, sans-serif',
                display: 'flex',
                flexDirection: 'column',
                margin: '20px',
                height: 'fit-content',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                }}
            >
                <strong>Order ID:</strong>
                <span>{selectedOrder._id}</span>
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                }}
            >
                <strong>Name:</strong>
                <span>{`${selectedOrder.customerID.username}`}</span>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                }}
            >
                <strong>Phone Number:</strong>
                {selectedOrder.customerID.phoneNumber}
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                }}
            >
                <strong>Address:</strong>
                <span>{`${selectedOrder.address.street}, ${selectedOrder.address.city}, ${selectedOrder.address.postalCode}`}</span>
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                }}
            >
                <strong>Total Price:</strong>
                <span>${selectedOrder.totalPrice.toFixed(2)}</span>
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                }}
            >
                <strong>Created:</strong>
                <span>{new Date(selectedOrder.timestamp).toLocaleString()}</span>
            </div>

            {/* Order Items */}
            <div style={{ display: 'grid', gap: '1rem', padding: '1rem' }}>
                {selectedOrder.orderItemList.map(
                    (orderItem) =>
                        isMenuItem(orderItem.menuItemID) && (
                            <div
                                key={orderItem.menuItemID._id}
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
                                    {orderItem.menuItemID.name}
                                </p>
                                <p style={{ margin: '0.25rem 0', color: '#555' }}>
                                    <strong>Available:</strong> {orderItem.menuItemID.availability ? 'Yes' : 'No'}
                                </p>
                                <p style={{ margin: '0.25rem 0', color: '#555' }}>
                                    <strong>Price:</strong> ${orderItem.menuItemID.price.toFixed(2)}
                                </p>
                            </div>
                        )
                )}
            </div>
            <div>
                <input
                    id="cy_rejectReasonInput"
                    type="text"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Reason for rejecting..."
                    style={{
                        padding: '8px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        width: '90%',
                    }}
                />
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '20px',
                }}
            >
                <Button
                    id="cy_rejectButton"
                    disabled={!rejectReason || selectedOrder.status !== 0}
                    variant="contained"
                    sx={{
                        backgroundColor: '#ff2b2b',
                        color: 'black',
                        textTransform: 'none',
                        padding: '8px 20px',
                    }}
                    onClick={() => handleRejectAcceptOrder(selectedOrder, false, rejectReason)}
                >
                    Reject
                </Button>
                <Button
                    disabled={selectedOrder.status !== 0}
                    variant="contained"
                    sx={{
                        backgroundColor: 'green',
                        color: 'black',
                        textTransform: 'none',
                        padding: '8px 20px',
                    }}
                    onClick={() => handleRejectAcceptOrder(selectedOrder, true)}
                >
                    Accept
                </Button>
            </div>
        </div>
    );
};

export default OrderCardDetailed;
