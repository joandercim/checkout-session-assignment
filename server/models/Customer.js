const CustomerLocation = require("./CustomerLocation");

class Customer {
  constructor(_id, firstname, lastname, email, password, location) {
    this._id = _id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.location = location;
  }
}

module.exports = Customer;
