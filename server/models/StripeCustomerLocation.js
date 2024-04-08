class StripeCustomerLocation {
    constructor(city, line1, postal_code) {
        this.city = city;
        this.line1 = line1;
        this.postal_code = postal_code;
    }
}

module.exports = StripeCustomerLocation;