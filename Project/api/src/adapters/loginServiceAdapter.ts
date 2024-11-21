import axios from 'axios';
import dotenv from 'dotenv';
import { UserCredentials } from '../interfaces/users.ts';
import { CustomError } from '../types/generic.ts';

dotenv.config();

const port = process.env.PORT
const BASE_URL = `http://localhost:${port}/loginService`;

async function loginServiceValidateCredentials(credentials: UserCredentials) {
    const { username, password } = credentials;
    
        const response = await axios.post(`${BASE_URL}/validateCredentials`, { username, password });
        return response.data;
    
}


export { loginServiceValidateCredentials };