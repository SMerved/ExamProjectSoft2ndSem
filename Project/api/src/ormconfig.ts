import { DataSource } from 'typeorm';
import { Task} from './entities/Task';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../config.env') });


const isTestEnvironment = process.env.NODE_ENV === 'test';
const databaseName = isTestEnvironment ? 'sqOla1Test' : 'sqOla1';

console.log('Database name:', databaseName);
export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: process.env.DATABASE_URL,
  database: databaseName,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  synchronize: true,
  logging: true,
  entities: [Task],
});