import { Stripe } from 'stripe';
import { PaymentStrategy } from './types/payment.ts';

const apiKey =
    'sk_test_51Q9kMkFpImY9hrD4SNtwYUp8z7y411DmXJ2sA3ahnPxmGcUT34ylDpJSVArqQpRVlkmFHFsXzkwszTi7cJaPEwR500E6HrAWDf';

const stripe = new Stripe(apiKey);

export class StripePaymentStrategy implements PaymentStrategy {
  async pay(amount: number, customerId: string): Promise<boolean> {
    try {
      const stripeUserId = await stripe.customers.create({ name: customerId });
      const paymentMethod = await stripe.paymentMethods.create({
        type: 'card',
        card: { token: 'tok_visa' },
      });
      await stripe.paymentMethods.attach(paymentMethod.id, { customer: stripeUserId.id });
      await stripe.paymentIntents.create({
        amount,
        currency: 'dkk',
        payment_method: paymentMethod.id,
        customer: stripeUserId.id,
        confirm: true,
        automatic_payment_methods: { enabled: true },
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
