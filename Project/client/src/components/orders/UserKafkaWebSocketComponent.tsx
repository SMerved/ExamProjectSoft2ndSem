import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const UserKafkaWebSocketComponent = () => {
    const [popupOpen, setPopupOpen] = useState<boolean>(false);
    const [currentMessage, setCurrentMessage] = useState<string>('');
    const serverUrl = 'ws://localhost:7080/v2/broker/?topics=user_topic';


    useEffect(() => {
        const ws = new WebSocket(serverUrl);

        ws.onopen = () => {
            console.log('Connected to Kafka WebSocket server');
        };

        ws.onmessage = (event) => {
            const formattedMessage = formatMessage(event.data);
            setCurrentMessage(formattedMessage);
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
    }, [serverUrl,currentMessage]);

    const formatMessage = (message: string) => {
        try {
            const parsedMessage = JSON.parse(message);
            let messageContent = parsedMessage.message;
            if (typeof messageContent === 'string') {
                messageContent = JSON.parse(messageContent);
            }

            return JSON.stringify(messageContent, null, 2);
        } catch (error) {
            console.error('Error parsing message:', error);
            return message;
        }
    };

    const handleClose = () => {
        setPopupOpen(false);
    };


    return (
        <div>
            <Dialog open={popupOpen} onClose={handleClose}>
                <DialogTitle>Your order has Arrived!</DialogTitle>
                <DialogContent>
                    <div>{ currentMessage}</div>
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

export default UserKafkaWebSocketComponent;