import { calculateAndUpdateOrderPayTest } from '../../../monolithOrderAndFeedback/OrderAndFeedbackCalculatePayTest.ts';
import * as orderAndFeedbackRepository from '../../../monolithOrderAndFeedback/OrderAndFeedbackRepository.ts';

jest.mock('../../../monolithOrderAndFeedback/OrderAndFeedbackRepository');

describe('calculateAndUpdateOrderPay EP/BVA', () => {
  const mockOrderID = 'SomeObjectId';
  const mockEmployeeID = 'SomeObjectId';
  const baseOrder = {
    _id: mockOrderID,
    employeeID: mockEmployeeID,
    totalPrice: 0,
    timestamp: new Date('2025-01-01T22:00:00Z').toISOString(),
    pickUpDate: new Date('2025-01-01T12:00:00Z'),
    completionDate: new Date('2025-01-01T12:25:00Z'),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (orderAndFeedbackRepository.orderRepository.findOne as jest.Mock).mockResolvedValue(baseOrder);
    (orderAndFeedbackRepository.orderRepository.find as jest.Mock).mockResolvedValue([baseOrder]);
    (orderAndFeedbackRepository.getRatingAVG as jest.Mock).mockResolvedValue(undefined); // Default no rating
    (orderAndFeedbackRepository.orderRepository.save as jest.Mock).mockImplementation((order) => order); // Mock save to return the same order
  });

  it('calculates order price bonus for various price ranges', async () => {
    const testCases = [
      { totalPrice: 0, expectedBonus: 0 }, 
      { totalPrice: 100, expectedBonus: 1 }, 
      { totalPrice: 250, expectedBonus: 2.5 }, 
      { totalPrice: 1000, expectedBonus: 10 }, 
    ];

    for (const { totalPrice, expectedBonus } of testCases) {
      const testOrder = { ...baseOrder, totalPrice };
      (orderAndFeedbackRepository.orderRepository.findOne as jest.Mock).mockResolvedValue(testOrder);

      const updatedOrder = await calculateAndUpdateOrderPayTest(mockOrderID);

      expect(updatedOrder.pay?.orderPriceBonus).toBe(expectedBonus);
    }
  });

  it('calculates total order quantity multiplier correctly for different orders count', async () => {
    const testCases = [
      { orderCount: 0, expectedMultiplier: 1 }, // Lower boundary
      { orderCount: 199, expectedMultiplier: 1.199 }, // Just below bonus threshold
      { orderCount: 200, expectedMultiplier: 1.2 }, // Exact threshold
      { orderCount: 201, expectedMultiplier: 1.2 }, // Capped multiplier
    ];

    for (const { orderCount, expectedMultiplier } of testCases) {
        (orderAndFeedbackRepository.orderRepository.find as jest.Mock).mockResolvedValue(Array(orderCount).fill(baseOrder));

      const updatedOrder = await calculateAndUpdateOrderPayTest(mockOrderID);

      expect(updatedOrder.pay?.totalOrderQuantityMultiplier).toBe(expectedMultiplier);
    }
  });

  it('applies night time bonus based on timestamp correctly', async () => {
    const testCases = [
      { timestamp: '2025-01-01T21:59:59Z', expectedBonus: 0 }, // Before night time
      { timestamp: '2025-01-01T22:00:00Z', expectedBonus: 2.5 }, // Start of night time
      { timestamp: '2025-01-01T23:59:59Z', expectedBonus: 2.5 }, // During night time
      { timestamp: '2025-01-02T04:59:59Z', expectedBonus: 2.5 }, // End of night time
      { timestamp: '2025-01-02T05:00:00Z', expectedBonus: 0 }, // After night time
    ];

    for (const { timestamp, expectedBonus } of testCases) {
      const testOrder = { ...baseOrder, timestamp };
      (orderAndFeedbackRepository.orderRepository.findOne as jest.Mock).mockResolvedValue(testOrder);

      const updatedOrder = await calculateAndUpdateOrderPayTest(mockOrderID);

      expect(updatedOrder.pay?.nightTimeBonus).toBe(expectedBonus);
    }
  });

  it('calculates delivery speed multiplier for various delivery times', async () => {
    const testCases = [
      { durationMinutes: 1, expectedMultiplier: 1.2 }, // Fastest delivery (capped multiplier)
      { durationMinutes: 30, expectedMultiplier: 1.2 }, // Within fast delivery range
      { durationMinutes: 31, expectedMultiplier: 1.1 }, // Moderate delivery threshold
      { durationMinutes: 45, expectedMultiplier: 1.1 }, // Within moderate range
      { durationMinutes: 46, expectedMultiplier: 1.05 }, // Slower delivery threshold
      { durationMinutes: 60, expectedMultiplier: 1.05 }, // Within slower range
      { durationMinutes: 61, expectedMultiplier: 1 }, // No multiplier (slow delivery)
    ];

    for (const { durationMinutes, expectedMultiplier } of testCases) {
      const testOrder = {
        ...baseOrder,
        pickUpDate: new Date('2025-01-01T12:00:00Z'),
        completionDate: new Date(
          new Date('2025-01-01T12:00:00Z').getTime() + durationMinutes * 60 * 1000
        ),
      };
      (orderAndFeedbackRepository.orderRepository.findOne as jest.Mock).mockResolvedValue(testOrder);

      const updatedOrder = await calculateAndUpdateOrderPayTest(mockOrderID);

      expect(updatedOrder.pay?.deliverySpeedMultiplier).toBe(expectedMultiplier);
    }
  });

  it('applies feedback rating multiplier for various ratings', async () => {
    const testCases = [
      { avgRating: undefined, expectedMultiplier: 0 }, // No rating
      { avgRating: 1, expectedMultiplier: 1.01 }, // Minimum rating
      { avgRating: 3, expectedMultiplier: 1.03 }, // Mid-range rating
      { avgRating: 5, expectedMultiplier: 1.05 }, // Maximum rating
    ];

    for (const { avgRating, expectedMultiplier } of testCases) {
        (orderAndFeedbackRepository.getRatingAVG as jest.Mock).mockResolvedValue(avgRating);

      const updatedOrder = await calculateAndUpdateOrderPayTest(mockOrderID);

      expect(updatedOrder.pay?.feedbackRatingMultiplier).toBeCloseTo(expectedMultiplier);
    }
  });
});
