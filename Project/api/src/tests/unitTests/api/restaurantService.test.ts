import request from 'supertest';
import express from 'express';
import * as dbFunctions from '../../../RestaurantService/dbFunctions.ts';
import { restaurantRouter } from '../../../RestaurantService/restaurantRoutes.ts';

jest.mock('../../../RestaurantService/dbFunctions');

const app = express();
app.use(express.json());
app.use('/restaurantService', restaurantRouter);

describe('GET /restaurantService/getAllRestaurants', () => {
    const mockRestaurants = [
        { id: 1, name: 'Restaurant A', location: 'City A' },
        { id: 2, name: 'Restaurant B', location: 'City B' },
    ];

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should return a list of restaurants if the database query is successful', async () => {
        (dbFunctions.getAllRestaurants as jest.Mock).mockResolvedValue(mockRestaurants);

        const response = await request(app).get('/restaurantService/getAllRestaurants');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockRestaurants);
    });

    it('should return a 500 error if the database query fails', async () => {
        (dbFunctions.getAllRestaurants as jest.Mock).mockRejectedValue(new Error('Database error'));

        const response = await request(app).get('/restaurantService/getAllRestaurants');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: 'An error occurred while fetching restaurants',
        });
    });
});
