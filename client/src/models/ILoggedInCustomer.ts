import { CustomerLocation } from './CustomerLocation';

export interface ILoggedInCustomer {
  name: string;
  email: string;
  stripeId: string
  location: CustomerLocation;
}

