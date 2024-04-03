const CustomerLocation = require("./CustomerLocation");

class Customer {
  constructor(_id, lastname, email, password, location) {
    this._id = _id;
    this.name = lastname;
    this.email = email;
    this.password = password;
    this.location = location;
  }
}

module.exports = Customer;
