import { IPrice } from './IPrice';

export interface IProduct {
  active: boolean;
  description: string;
  images: string[];
  id: string;
  default_price: IPrice;
  name: string;
}
