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
        }
        return this.producer;
    }

    createConsumer(groupId: string) {
        if (!this.consumer) {
            this.consumer = this.kafka.consumer({ groupId: groupId });
        }
        return this.consumer;
    }

    // Adapter method for sending events
    async sendEvent(eventType: string, payload: any): Promise<void> {
        const producer = this.createProducer();
        await producer.connect();

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

        const retries = 3;
        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
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
            } catch (error) {
                if (attempt === retries) {
                    throw error;
                }
                console.warn(`Attempt ${attempt} failed. Retrying...`);
            }
        }
    }
}
