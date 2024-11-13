import { Express, Request, Response } from 'express';
import { Kafka, KafkaConfig } from 'kafkajs';
import { sendEvent } from './kafkaAdapter.ts';

export function messagingRoutes(app: Express) {
    app.get('/msg', async (req: Request, res: Response) => {
        res.json({ message: 'This is a new endpoint' });
    });

    app.get('/sendEvent', async (req: Request, res: Response) => {
        try {
            // Example usage: Sending an "Order Placed" event
            await sendEvent('Order Placed', {
                orderId: '12345',
                userId: 'user1',
                deliveryAddress: '123 Main St',
                items: ['Pizza', 'Soda'],
            });
            res.json({ message: 'Event sent!' });
        } catch (error) {
            console.error('Error sending event:', error); // eslint-disable-line no-console
            res.status(500).json({ error: 'Server error' });
        }
    });
}
