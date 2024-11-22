import { useEffect, useState } from 'react';
import { Order } from '../types/orders';
import { GetOrdersAPIByRestaurantID } from '../api/orders';
import { OrderStatusTextEnum } from '../utilities';
import { useLocation } from 'react-router-dom';
import { User } from '../types/users';
import { LineChart } from '@mui/x-charts';
import { orderCountToLineChartSeries, orderIncomeToLineChartSeries } from '../chartFunctions/linechart.ts';

function RestuarantPage() {
    const location = useLocation();
    const user: User = location.state?.user;

    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const [yData, setYData] = useState<number[]>([]);
    const [labels, setLabels] = useState<string[]>([]);
    const [labelType, setLabelType] = useState<string>('Income');

    const fetchOrders = async () => {
        try {
            if (!user.restaurant) return;
            const orders = await GetOrdersAPIByRestaurantID(user.restaurant);
            setOrders(orders);

            if (labels.length == 0 && yData.length == 0) {
                setLabelType('Income');
                setLabelType('Order count');
                const series = orderCountToLineChartSeries(orders);
                const y = [];
                const labels = [];

                series.forEach(l => {
                    y.push(l.y);
                    labels.push(l.label);
                });

                setYData(y);
                setLabels(labels);
            }
        } catch (error) {
            console.error('Error fetching Orders:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handleOrderClick(order: Order) {
        try {
            setSelectedOrder(order);
        } catch (error) {
            console.error('Failed to fetch menu items:', error);
        }
    }

    return (
        <div>
            <div>
                <button onClick={() => {
                    if (labelType == 'Income') {
                        setLabelType('Order count');
                        const series = orderCountToLineChartSeries(orders);
                        const y = [];
                        const labels = [];

                        series.forEach(l => {
                            y.push(l.y);
                            labels.push(l.label);
                        });

                        setYData(y);
                        setLabels(labels);

                    } else if (labelType == 'Order count') {
                        setLabelType('Income');
                        const series = orderIncomeToLineChartSeries(orders);
                        const y = [];
                        const labels = [];

                        series.forEach(l => {
                            y.push(l.y);
                            labels.push(l.label);
                        });

                        setYData(y);
                        setLabels(labels);
                    }
                }}>{labelType == 'Income' ? 'Show Order count' : 'Show Income'}</button>
                <LineChart
                    xAxis={[{
                        scaleType: 'point',
                        data: labels,
                        label: labelType,
                    }]}
                    series={[
                        {
                            data: yData,
                            area: true,
                        },
                    ]}
                    height={400}
                />
            </div>
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
                                            order.timestamp,
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
                                                2,
                                            )}
                                        </p>
                                    </div>

                                    <div>
                                        <strong>Timestamp:</strong>
                                        <p>
                                            {new Date(
                                                selectedOrder.timestamp,
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
                                            {selectedOrder.orderItemList.map(
                                                (orderItem) => (
                                                    <div
                                                        key={
                                                            orderItem.menuItem
                                                                ._id
                                                        }
                                                        style={{
                                                            border: '1px solid #ccc',
                                                            borderRadius: '8px',
                                                            padding: '1rem',
                                                        }}
                                                    >
                                                        <p
                                                            style={{
                                                                margin: '0.5rem 0',
                                                                fontWeight:
                                                                    'bold',
                                                                fontSize:
                                                                    '1.2rem',
                                                            }}
                                                        >
                                                            {
                                                                orderItem
                                                                    .menuItem
                                                                    .name
                                                            }
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
                                                            {orderItem.menuItem
                                                                .availability
                                                                ? 'Yes'
                                                                : 'No'}
                                                        </p>
                                                        <p
                                                            style={{
                                                                margin: '0.25rem 0',
                                                                color: '#555',
                                                            }}
                                                        >
                                                            <strong>
                                                                Price:
                                                            </strong>{' '}
                                                            $
                                                            {
                                                                orderItem
                                                                    .menuItem
                                                                    .price
                                                            }
                                                        </p>
                                                    </div>
                                                ),
                                            )}
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
