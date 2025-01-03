import { PaymentStrategy } from "./types/payment.ts";

export class PaymentProcessor {
    private strategy: PaymentStrategy;
  
    constructor(strategy: PaymentStrategy) {
      this.strategy = strategy;
    }
  
    setStrategy(strategy: PaymentStrategy) {
      this.strategy = strategy;
    }
  
    async processPayment(amount: number, customerId: string): Promise<boolean> {
      return this.strategy.pay(amount, customerId);
    }
  }
  