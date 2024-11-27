export enum USER_ROLES {
    ADMIN = 'admin',
    CUSTOMER = 'customer',
    DELIVERY = 'delivery',
    RESTAURANT = 'restaurant',
}

export interface User {
    _id: string;
    username: string;
    password: string;
    role: USER_ROLES;
    address?: string;
    restaurant?: string;
    phoneNumber?: number;
}

export interface Credentials {
    username: string;
    password: string;
}
