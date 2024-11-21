import { Restaurant } from '../types/restaurants';
import { Order } from '../types/orders';
import { ordersToCountChartSeries, ordersToIncomeChartSeries } from '../chartFunctions/piechart';

describe('Total orders per restaurant to data series', () => {
    const restaurants: Restaurant[] = [
        {
            _id: '1',
            name: 'res1',
            address: {
                _id: '',
                street: '',
                city: '',
                postalCode: 0,
            },
            menu: [],
        },
        {
            _id: '2',
            name: 'res2',
            address: {
                _id: '',
                street: '',
                city: '',
                postalCode: 0,
            },
            menu: [],
        },
    ];
    const orders: Order[] = [
        {
            _id: '1',
            customerID: {
                _id: '',
                username: '',
                password: '',
                role: '',
                address: '',
                phoneNumber: undefined,
            },
            restaurantID: '1',
            status: 0,
            address: {
                _id: '',
                street: '',
                city: '',
                postalCode: 0,
            },
            totalPrice: 50,
            feedbackID: '',
            timestamp: '',
            orderItemList: [],
        },
        {
            _id: '2',
            customerID: {
                _id: '',
                username: '',
                password: '',
                role: '',
                address: '',
                phoneNumber: undefined,
            },
            restaurantID: '1',
            status: 0,
            address: {
                _id: '',
                street: '',
                city: '',
                postalCode: 0,
            },
            totalPrice: 80,
            feedbackID: '',
            timestamp: '',
            orderItemList: [],
        },
        {
            _id: '3',
            customerID: {
                _id: '',
                username: '',
                password: '',
                role: '',
                address: '',
                phoneNumber: undefined,
            },
            restaurantID: '2',
            status: 0,
            address: {
                _id: '',
                street: '',
                city: '',
                postalCode: 0,
            },
            totalPrice: 30,
            feedbackID: '',
            timestamp: '',
            orderItemList: [],
        },
    ];

    const expectedResult = [
        { id: '1', value: 2, label: 'res1' },
        { id: '2', value: 1, label: 'res2' },
    ];

    it('Should return equal as expected result', () => {
        const result = ordersToCountChartSeries(orders, restaurants);
        expect(result).toEqual(expectedResult);
    });
});

describe('Total orders income per restaurant to data series', () => {
    const restaurants: Restaurant[] = [
        {
            _id: '1',
            name: 'res1',
            address: {
                _id: '',
                street: '',
                city: '',
                postalCode: 0,
            },
            menu: [],
        },
        {
            _id: '2',
            name: 'res2',
            address: {
                _id: '',
                street: '',
                city: '',
                postalCode: 0,
            },
            menu: [],
        },
    ];
    const orders: Order[] = [
        {
            _id: '1',
            customerID: {
                _id: '',
                username: '',
                password: '',
                role: '',
                address: '',
                phoneNumber: undefined,
            },
            restaurantID: '1',
            status: 0,
            address: {
                _id: '',
                street: '',
                city: '',
                postalCode: 0,
            },
            totalPrice: 50,
            feedbackID: '',
            timestamp: '',
            orderItemList: [],
        },
        {
            _id: '2',
            customerID: {
                _id: '',
                username: '',
                password: '',
                role: '',
                address: '',
                phoneNumber: undefined,
            },
            restaurantID: '1',
            status: 0,
            address: {
                _id: '',
                street: '',
                city: '',
                postalCode: 0,
            },
            totalPrice: 80,
            feedbackID: '',
            timestamp: '',
            orderItemList: [],
        },
        {
            _id: '3',
            customerID: {
                _id: '',
                username: '',
                password: '',
                role: '',
                address: '',
                phoneNumber: undefined,
            },
            restaurantID: '2',
            status: 0,
            address: {
                _id: '',
                street: '',
                city: '',
                postalCode: 0,
            },
            totalPrice: 30,
            feedbackID: '',
            timestamp: '',
            orderItemList: [],
        },
    ];

    const expectedResult = [
        { id: '1', value: 130, label: 'res1' },
        { id: '2', value: 30, label: 'res2' },
    ];

    it('Should return equal as expected result', () => {
        const result = ordersToIncomeChartSeries(orders, restaurants);
        expect(result).toEqual(expectedResult);
    });
});