import { Kafka, Producer, Consumer } from 'kafkajs';
import MessageBroker from './types/types.ts';

export class KafkaAdapter implements MessageBroker {
    private kafka: Kafka;
    private producer: Producer | undefined;
    private consumer: Consumer | undefined;
    private readonly topic: string;
    private readonly groupId: string;

    constructor(clientId: string, groupId: string, topic: string) {
        const brokers = process.env.KAFKA_BROKERS?.split(',') || [];
        console.log('brokers:', brokers);
        this.kafka = new Kafka({
            clientId,
            brokers,
        });
        this.groupId = groupId;
        this.topic = topic;
    }

    createProducer() {
        if (!this.producer) {
            this.producer = this.kafka.producer();
            console.log('Creating new producer');
        }
        return this.producer;
    }

    createConsumer(groupId: string) {
        if (!this.consumer) {
            this.consumer = this.kafka.consumer({ groupId: groupId });
            console.log('Creating new consumer');
        }
        return this.consumer;
    }

    // Adapter method for sending events
    async sendEvent(eventType: string, payload: any): Promise<void> {
        const retries = 3;
        const producer = this.createProducer();

        try {
            await producer.connect();

            for (let attempt = 1; attempt <= retries; attempt++) {
                try {
                    const message = {
                        topic: this.topic,
                        messages: [
                            {
                                value: JSON.stringify({
                                    eventType,
                                    payload,
                                    timestamp: Date.now(),
                                }),
                            },
                        ],
                    };

                    await producer.send(message);
                    return; // Exit the function if the message is sent successfully
                } catch (error) {
                    if (attempt === retries) {
                        throw error;
                    }
                    console.warn(`Attempt ${attempt} failed. Retrying...`);
                }
            }
        } finally {
            await producer.disconnect();
        }
    }

    // Adapter method for consuming events
    async consumeEvents(
        handler: (eventType: string, payload: any) => void
    ): Promise<void> {
        const consumer = this.createConsumer(this.groupId);
        await consumer.connect();
        await consumer.subscribe({
            topic: this.topic,
            fromBeginning: false,
        });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                if (!message.value) {
                    console.warn('Message value is null');
                    return;
                }

                const event = JSON.parse(message.value.toString());
                const { eventType, payload } = event;

                try {
                    handler(eventType, payload);
                } catch (error) {
                    console.error(
                        `Error handling event type: ${eventType}`,
                        error
                    );
                }

                await consumer.commitOffsets([
                    {
                        topic,
                        partition,
                        offset: (Number(message.offset) + 1).toString(),
                    },
                ]);
            },
        });
    }
}
