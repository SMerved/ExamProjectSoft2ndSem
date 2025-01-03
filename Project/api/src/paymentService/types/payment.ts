export interface PaymentStrategy {
    pay(amount: number, customerId: string): Promise<boolean>;
  }

export enum PAYMENT_METHODS {
    STRIPE = 'stripe',
    PAYPAL = 'paypal'
}

export interface PaymentCredentials {
    price: number;
    customerId: string;
    paymentMethod: PAYMENT_METHODS;
}