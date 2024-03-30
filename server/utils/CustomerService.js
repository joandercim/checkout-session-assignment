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
}

module.exports = CustomerService;
