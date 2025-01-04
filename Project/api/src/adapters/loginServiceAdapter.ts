import axios from 'axios';
import dotenv from 'dotenv';
import { UserCredentials } from '../interfaces/users.ts';

dotenv.config();

const port = process.env.PORT;
const BASE_URL = `http://localhost:${port}/loginService`;

async function loginServiceValidateCredentials(credentials: UserCredentials) {
    const { username /*sanitized*/, password /* sanitized */ } = credentials;

    const response = await axios.post(`${BASE_URL}/validateCredentials`, {
        username,
        password,
    }); //Sink

    //Sink
    return response.data; //Potential errors get thrown to caller and handled.
}

export { loginServiceValidateCredentials };
