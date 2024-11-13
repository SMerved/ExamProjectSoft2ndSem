import { AppDataSource } from '../ormconfig.ts';
import * as orderAndFeedbackRepository from '../monolithOrderAndFeedback/OrderAndFeedbackRepository.ts'
import request from 'supertest';
import app from '../index.ts';

jest.mock('../monolithOrderAndFeedback/OrderAndFeedbackRepository.ts')

describe("Post /create", () => {
    const mockOrder = { userID: 1, restaurantID: 2324, menuItems: [1, 23, 24], address: 11};

    beforeAll(async () => {
        await AppDataSource.initialize()
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    })

    beforeEach(() => {
        jest.restoreAllMocks()
    })

    afterEach(async () => {
        jest.resetAllMocks();
    })

    it("should return order object if order creation is successful", async () => {
        (orderAndFeedbackRepository.AddOrder as jest.Mock).mockResolvedValue(mockOrder);

        const response = await request(app)
            .post('/create')
            .send({userID: 1, restaurantID: 2324, menuItems: [1, 23, 24], address: 11});

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockOrder);
    })

    it("should return 401 error if order creation is unsuccessful", async () => {
        (orderAndFeedbackRepository.AddOrder as jest.Mock).mockResolvedValue(null);

        const response = await request(app)
            .post('/create')
            .send({userID: 1, restaurantID: 2324, menuItems: [1, 23, 24], address: 11});

        expect(response.status).toBe(401);
        expect(response.body).toEqual(mockOrder);
    })
})