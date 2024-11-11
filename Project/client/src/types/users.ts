export enum USER_ROLES {
    ADMIN = 'admin',
    CUSTOMER = 'customer',
    DELIVERY = 'delivery',
    RESTAURANT = 'restaurant'
}

export interface User {
    id: string;
    username: string;
    password: string;
    role: USER_ROLES;
    address?: string;
    restaurant?: string;
  }