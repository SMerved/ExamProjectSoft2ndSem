import { Kafka } from 'kafkajs';

// Create a Kafka instance
const kafka = new Kafka({
    clientId: 'food-delivery-app',  // unique client identifier
    brokers: ['localhost:9092'],     // replace with your Kafka broker addresses
});

// Create a producer
const producer = kafka.producer();

// Function to send an event (message)
async function sendEvent(eventType: string, payload: any) {
    await producer.connect();

    await producer.send({
        topic: 'order-events',  // specify the topic to which you want to send events
        messages: [
            {
                value: JSON.stringify({ eventType, payload, timestamp: Date.now() }), // payload can be your event data
            },
        ],
    });

    console.log(`Event ${eventType} sent!`);

    await producer.disconnect();
}

export { sendEvent };
