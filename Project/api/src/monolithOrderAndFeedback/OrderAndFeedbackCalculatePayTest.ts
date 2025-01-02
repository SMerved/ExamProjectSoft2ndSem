import { ObjectId } from "mongodb";
import { getRatingAVG, orderRepository } from "./OrderAndFeedbackRepository.ts";
import { Order } from "./Order.ts";
import { calculateDeliveryPay } from "../utilities/order.ts";

export async function calculateAndUpdateOrderPayTest(orderID: string) {
    const orderObjectID = new ObjectId(orderID);

    const order = await orderRepository.findOne({
        where: {_id: orderObjectID},
    });

    const allOrders = await orderRepository.find({
        where: {
            employeeID: order?.employeeID,
        },
    });

    const totalOrdersAmount = allOrders.length;

    if (!order) {
        throw new Error(`Order with ID ${orderID} not found`);
    }

    const pay = {
        baseAmount: 0,
        totalOrderQuantityMultiplier: 0,
        deliverySpeedMultiplier: 0,
        feedbackRatingMultiplier: 0,
        orderPriceBonus: 0,
        nightTimeBonus: 0,
        totalPay: 0,
    };

    order.pay = pay;

    pay.baseAmount = 5; // Base pay

    pay.orderPriceBonus = order.totalPrice / 100; // Bonus depending on order price

    const multiplicationFactor = totalOrdersAmount / 1000 > 0.2 ? 0.2 : totalOrdersAmount / 1000;
    pay.totalOrderQuantityMultiplier = 1 + multiplicationFactor; // Bonus for total amount of orders done. Bonus slowly increases and maxes out at 25% bonus

    if (new Date(order.timestamp).getUTCHours() >= 22 || new Date(order.timestamp).getUTCHours() < 5) {
        pay.nightTimeBonus = 2.5; // Night bonus added if order is created between 10 pm and 5 am
    }

    if (order.pickUpDate && order.completionDate) {
        const deliveryTimeInMinutes = (Number(order.completionDate) - Number(order.pickUpDate)) / 1000 / 60;
        let multiplier = 1;

        if (deliveryTimeInMinutes <= 30) {
            multiplier = 1.2; // 20% bonus for fast delivery
        } else if (deliveryTimeInMinutes <= 45) {
            multiplier = 1.1; // 10% bonus for moderate delivery
        } else if (deliveryTimeInMinutes <= 60) {
            multiplier = 1.05; // 5% bonus for slower delivery
        }
        pay.deliverySpeedMultiplier = multiplier; // Bonuns for delivery time
    }

    const avgRating = await getRatingAVG(order._id);
    if (avgRating) pay.feedbackRatingMultiplier = 1 + avgRating / 100; // Bonus for rating

    const orderTemp: Order = {
        ...order,
        pay: {
            baseAmount: pay.baseAmount,
            totalOrderQuantityMultiplier: pay.totalOrderQuantityMultiplier,
            deliverySpeedMultiplier: pay.deliverySpeedMultiplier,
            feedbackRatingMultiplier: pay.feedbackRatingMultiplier,
            orderPriceBonus: pay.orderPriceBonus,
            nightTimeBonus: pay.nightTimeBonus,
            totalPay: calculateDeliveryPay(order.pay),
        },
    };

    const updatedOrder = await orderRepository.save(orderTemp);

    return updatedOrder;
}