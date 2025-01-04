import { PaymentStrategy } from "./types/payment.ts";

export class MockPaypalStrategy implements PaymentStrategy {
    async pay(amount: number, customerId: string): Promise<boolean> {
      // eslint-disable-next-line no-console
      console.log(`Mock payment of ${amount} DKK for customer ${customerId} processed.`);
      return true;
    }
  }