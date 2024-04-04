export class CartItem {
  constructor(
    public productId: string,
    public quantity: number,
    public images: string[],
    public name: string, 
    public price: number
  ) { }
}
