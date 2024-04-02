export class CartItem {
  constructor(
    public default_price: string,
    public quantity: number,
    public images: string[],
    public name: string, 
    public price: number
  ) { }
}
