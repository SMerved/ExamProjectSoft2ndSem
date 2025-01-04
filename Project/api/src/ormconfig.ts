import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User, Address as loginAddress } from './loginService/User.ts';
import {
    MenuItem,
    Restaurant,
    Address,
} from './RestaurantService/Restaurant.ts';
import { Order } from './monolithOrderAndFeedback/Order.ts';
import { Feedback } from './monolithOrderAndFeedback/Feedback.ts';

dotenv.config();

const isTestEnv = process.env.NODE_ENV === 'test';
const databaseName = isTestEnv ? 'SoftExamTest' : 'SoftExam';

class DatabaseConnection {
    private static instance: DataSource;

    private constructor() {}

    public static getInstance(): DataSource {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DataSource({
                type: 'mongodb',
                url: process.env.DATABASE_URL,
                database: databaseName,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                synchronize: true,
                logging: true,
                entities: [
                    User,
                    Restaurant,
                    MenuItem,
                    Order,
                    Feedback,
                    Address,
                    loginAddress,
                ],
            });
        }
        return DatabaseConnection.instance;
    }
}

export const AppDataSource = DatabaseConnection.getInstance();
