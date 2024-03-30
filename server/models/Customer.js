const CustomerLocation = require("./CustomerLocation");

class Customer {
  constructor(_id, email, password, location) {
    this._id = _id;
    this.email = email;
    this.password = password;
    this.location = location;
  }
}

module.exports = Customer;
