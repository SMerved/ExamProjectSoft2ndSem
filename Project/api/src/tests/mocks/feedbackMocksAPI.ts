export const mockFeedback = {
    _id: 'someObjectId',
    foodRating: 5,
    overallRating: 4,
    deliveryRating: 3,
};

export const mockFeedbackPayload = {
    foodRating: 5,
    overallRating: 4,
    deliveryRating: 3,
    orderId: 'someObjectId',
};

export const incorrectMockFeedbackPayload = {
    foodRating: 5,
    overallRating: 4,
    deliveryRating: 'w',
    orderId: 'wrongObjectId',
};