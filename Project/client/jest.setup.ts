import { setupServer } from 'msw/node';
import { handlers } from './src/mocks/handlers';

jest.mock('./src/constants', () => ({
    BASE_URL: 'http://localhost:3001',
  }));

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => {
    jest.resetAllMocks();
    server.close();
});
