import express from 'express';
import { getAllRestaurants } from './dbFunctions.ts';

const restaurantRouter = express.Router();

restaurantRouter.get('/getAllRestaurants', async (req, res) => {
    try {
        const restaurants = await getAllRestaurants();
        res.json(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching restaurants' });
    }
});

export { restaurantRouter };
