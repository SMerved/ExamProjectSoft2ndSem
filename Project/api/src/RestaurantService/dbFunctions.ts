import { User } from '../loginService/User.ts';
import { Order } from '../monolithOrderAndFeedback/Order.ts';
import { AppDataSource } from '../ormconfig.ts';
import { Address, MenuItem, Restaurant } from './Restaurant.ts';
// import { ObjectId } from 'mongodb';

const restaurantRepository = AppDataSource.getMongoRepository(Restaurant);
const menuItemRepository = AppDataSource.getMongoRepository(MenuItem);
const addressRepository = AppDataSource.getMongoRepository(Address);
const userRepository = AppDataSource.getMongoRepository(User);

async function getMenuItems(object: any) {
    const menuItems = await menuItemRepository.find({
        where: {
            _id: { $in: object.menu },
        },
    });

    return menuItems;
}

async function getAddress(object: Restaurant | Order) {
    const address = await addressRepository.findOne({
        where: {
            _id: object.address,
        },
    });

    return address;
}

async function getCustomer(object: any) {
    const customer = await userRepository.findOne({
        where: {
            _id: object.customerID,
        },
    });

    return customer;
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

export {
    getMenuItems,
    getCustomer,
    getAllRestaurants,
    getAddress,
    restaurantRepository,
};
