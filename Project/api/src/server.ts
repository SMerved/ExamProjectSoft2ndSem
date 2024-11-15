import app from './index.ts';

import 'reflect-metadata';
import { AppDataSource } from './ormconfig.ts';
import { runConsumer } from './messagingService/kafkaAdapter.ts';

const port = 3001;

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!'); // eslint-disable-line no-console
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`); // eslint-disable-line no-console
        });

        //Kafka listener for events
        runConsumer().catch(console.error);
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err);
    });
