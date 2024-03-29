const fs = require('fs').promises;

class UserService {
  constructor() {}

  static async getAllUsers() {
    const data = await fs.readFile('./data/users.json');
    return await JSON.parse(data);
  }

  static async getCurrentUserByID(id) {
    const users = await this.getAllUsers();
    return users.find((u) => u._id === id);
  }

  static async getCurrentUserByEmail(email) {
    const users = await this.getAllUsers();
    return users.find((u) => u.email === email);
  }
}

module.exports = UserService;
