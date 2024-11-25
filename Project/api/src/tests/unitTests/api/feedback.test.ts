import * as orderAndFeedbackRepository from '../../../monolithOrderAndFeedback/OrderAndFeedbackRepository.ts';
import request from 'supertest';
import app from '../../../index.ts';
import { incorrectMockFeedbackPayload, mockFeedback, mockFeedbackPayload } from '../../mocks/feedbackMocksAPI.ts';

jest.mock('../../../monolithOrderAndFeedback/orderAndFeedbackRepository.ts');

describe('POST /createFeedback', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should return feedback object if feedback creation is successful', async () => {
        (
            orderAndFeedbackRepository.createFeedbackAndLinkOrder as jest.Mock
        ).mockResolvedValue(mockFeedback);

        const response = await request(app).post('/createFeedback').send(mockFeedbackPayload);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockFeedback);
    });

    it('should return 401 error if feedback creation is unsuccessful', async () => {
        (
            orderAndFeedbackRepository.createFeedbackAndLinkOrder as jest.Mock
        ).mockResolvedValue(null);

        const response = await request(app).post('/createFeedback').send(incorrectMockFeedbackPayload);

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ error: 'Invalid feedback data' });
    });

    it('should return 500 error if there is an internal server error', async () => {
        (orderAndFeedbackRepository.createFeedbackAndLinkOrder as jest.Mock).mockRejectedValue(new Error('Database error'));

        const response = await request(app)
            .post('/createFeedback')
            .send(mockFeedbackPayload);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Error creating feedback' });
    });
});
