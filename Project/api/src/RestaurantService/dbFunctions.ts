import { AppDataSource } from '../ormconfig.ts';
import { Restaurant } from '../entities/restaurant.ts';
// import { ObjectId } from 'mongodb';

const restaurantRepository = AppDataSource.getMongoRepository(Restaurant);

async function getAllRestaurants() {
    const bookings = await restaurantRepository.find();
    return bookings;
}

export { getAllRestaurants, restaurantRepository };
