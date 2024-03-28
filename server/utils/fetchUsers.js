const fs = require('fs').promises;

exports.fetchUsers = async () => {
  const data = await fs.readFile('./data/users.json');
  return await JSON.parse(data);
};
