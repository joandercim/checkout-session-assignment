const fs = require('fs').promises;

class CustomerService {
  constructor() {}

  static async getAllCustomers() {
    const data = await fs.readFile('./data/customers.json');
    return await JSON.parse(data);
  }

  static async getCurrentCustomerByID(id) {
    const customers = await this.getAllCustomers();
    return customers.find((u) => u._id === id);
  }

  static async getCurrentCustomerByEmail(email) {
    const customers = await this.getAllCustomers();
    return customers.find((u) => u.email === email);
  }

  static async getOrdersByCustomerEmail(email) {
    const orders = await fs.readFile('./data/orders.json');
    const customerOrders = await JSON.parse(orders);
    return customerOrders.filter((order) => order.customerEmail === email);
  }
}

module.exports = CustomerService;
