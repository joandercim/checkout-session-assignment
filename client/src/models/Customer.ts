import { CustomerLocation } from './CustomerLocation';

export class Customer {
  constructor(
    public _id: string,
    public firstname: string,
    public lastname: string,
    public email: string,
    public password: string,
    public location: CustomerLocation
  ) {}
}
