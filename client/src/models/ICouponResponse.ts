export interface ICouponResponse {
        success: boolean;
        promotionCodes: IPromotionCodes;
    status: number;
    statusText: string;
}

interface IPromotionCodes {
    object: string;
    data: IPromotionCode[];
}

interface IPromotionCode {
    id: string;
    object: string;
    active: boolean;
    code: string;
    name: string,
    percent_off: number
}

interface ICoupon {
    id: string;
    object: string;
    amount_off: null;
    currency: null;
    name: string;
    percent_off: number;
}
