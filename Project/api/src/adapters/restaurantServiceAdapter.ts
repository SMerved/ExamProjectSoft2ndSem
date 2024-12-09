import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;
const BASE_URL = `http://localhost:${port}/restaurantService`;

async function restaurantServiceGetAllRestaurants() {
    const response = await axios.get(`${BASE_URL}/getAllRestaurants`);
    return response.data; //Potential errors get thrown to caller and handled.
}

export { restaurantServiceGetAllRestaurants };
