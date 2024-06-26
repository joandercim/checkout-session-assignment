import { IOrderItem } from "./IOrderItem";

export interface IOrder {
    customerEmail: string,
    orderNumber: number,
    timestamp: string,
    total: number,
    payment_status: string, 
    payment_method_types: string[],
    products: {
        data: IOrderItem[]
    }
}