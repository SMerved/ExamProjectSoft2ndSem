import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT
const BASE_URL = `http://localhost:${port}/userService`;

async function validateCredentials(username: string, password: string) {
    try {
        const response = await axios.post(`${BASE_URL}/validateCredentials`, { username, password });
        return response.data;
    } catch (error) {
        console.error('Error communicating with userService:', error);
        throw new Error('UserService is unavailable');
    }
}

export { validateCredentials };
