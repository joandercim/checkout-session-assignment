export interface IOrderItem {
    amount_total: string,
    description: string,
    quantity: number,
    price: {
        currency: string, 
        unit_amount: string
    }
}