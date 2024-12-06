import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Order,  OrderItem, MenuItem } from '../types/orders';
import  { Address } from '../types/address';

const KafkaWebSocketComponent = () => {
    const [popupOpen, setPopupOpen] = useState<boolean>(false);
    const [currentMessage, setCurrentMessage] = useState<string>('');
    const serverUrl = 'ws://localhost:7080/v2/broker/?topics=restaurant_topic';
    const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

    useEffect(() => {
        const ws = new WebSocket(serverUrl);

        ws.onopen = () => {
            console.log('Connected to Kafka WebSocket server');
        };

        ws.onmessage = (event) => {
            console.log('Received message:', event.data);
            const formattedMessage = formatMessage(event.data);
            setCurrentMessage(formattedMessage);
            setCurrentOrder(createOrderObject(event.data));
            setPopupOpen(true);
        };

        ws.onclose = () => {
            console.log('Disconnected from Kafka WebSocket server');
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            ws.close();
        };
    }, [serverUrl]);

    const formatMessage = (message: string) => {
        try {
            const parsedMessage = JSON.parse(message);
            return JSON.stringify(parsedMessage, null, 2);
        } catch (error) {
            console.error('Error parsing message:', error);
            return message;
        }
    };

    const handleClose = () => {
        setPopupOpen(false);
    };

    const createOrderObject = (message: string): Order | null => {
        try {
            const parsedMessage = JSON.parse(message);
            const payload = parsedMessage.message.payload;


            const address: Address = {
                _id: payload.address._id,
                street: payload.address.street,
                city: payload.address.city,
                postalCode: payload.address.postalCode
            };

            const orderItems: OrderItem[] = payload.orderItemList.map((item: any) => ({
                menuItem: {
                    _id: item.menuItem._id,
                    name: item.menuItem.name,
                    price: item.menuItem.price,
                    availability: item.menuItem.availability
                },
                quantity: item.quantity
            }));

            const order: Order = {
                _ID: payload.userID, // Assuming userID is not provided in the message
                restaurantID: payload.restaurantID,
                employeeID: payload.employeeID || '',
                status: payload.status, // Assuming status is not provided in the message
                address: address,
                totalPrice: payload.totalPrice,
                timestamp: payload.timestamp,
                orderItemList: orderItems,
                pickUpDate: undefined, // Assuming pickUpDate is not provided in the message
                completionDate: undefined, // Assuming completionDate is not provided in the message
                pay: undefined // Assuming pay is not provided in the message
            };

            return order;
        } catch (error) {
            console.error('Error creating order object:', error);
            return null;
        }
    };
    return (
        <div>
            <Dialog open={popupOpen} onClose={handleClose}>
                <DialogTitle>New Order has been received</DialogTitle>
                <DialogContent>
                    <pre>{currentMessage}</pre>
                    {currentOrder && (
                        <pre>{JSON.stringify(currentOrder, null, 2)}</pre>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default KafkaWebSocketComponent;