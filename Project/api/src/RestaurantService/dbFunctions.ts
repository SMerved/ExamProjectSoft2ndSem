import { AppDataSource } from '../ormconfig.ts';
import { Address, MenuItem, Restaurant } from './Restaurant.ts';
// import { ObjectId } from 'mongodb';

const restaurantRepository = AppDataSource.getMongoRepository(Restaurant);
const menuItemRepository = AppDataSource.getMongoRepository(MenuItem);
const addressRepository = AppDataSource.getMongoRepository(Address);

async function getMenuItems(restaurant: Restaurant) {
    const menuItems = await menuItemRepository.find({
        where: {
            _id: { $in: restaurant.menu },
        },
    });

    return menuItems;
}

async function getAddress(restaurant: Restaurant) {
    const address = await addressRepository.findOne({
        where: {
            _id: restaurant.address,
        },
    });

    return address;
}

async function getAllRestaurants() {
    const restaurants = await restaurantRepository.find();

    const restaurantList = [];

    for (const restaurant of restaurants) {
        const menuItems = await getMenuItems(restaurant);
        const address = await getAddress(restaurant);

        const restaurantTemp = {
            ...restaurant,
            menu: menuItems,
            address: address,
        };

        restaurantList.push(restaurantTemp);
    }

    return restaurantList;
}

export { getMenuItems, getAllRestaurants, restaurantRepository };
