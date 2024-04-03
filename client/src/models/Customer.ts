import { CustomerLocation } from './CustomerLocation';

export class Customer {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public location: CustomerLocation
  ) {}
}
