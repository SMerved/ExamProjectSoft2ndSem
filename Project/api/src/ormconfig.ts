import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const databaseName = 'SoftExam';

export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: process.env.DATABASE_URL,
  database: databaseName,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  synchronize: true,
  logging: true,
  entities: [],
});