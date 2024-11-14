import { ObjectId } from "mongodb";


export interface OrderData {
    customerID: ObjectId;
    restaurantID: ObjectId;
    address: ObjectId;
    totalPrice: number;
    menuItemIDList: ObjectId[];
}