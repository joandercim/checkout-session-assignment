import { CustomerLocation } from './CustomerLocation';

export interface ILoggedInCustomer {
  name: string;
  email: string;
  location: CustomerLocation;
}

