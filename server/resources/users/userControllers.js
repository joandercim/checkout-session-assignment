const { fetchUsers } = require('../../utils/fetchUsers');

const fs = require('fs').promises;

exports.getUsers = async (req, res) => {
  // TODO: Should only work if admin?
  const users = await fetchUsers();

  res.status(200).json({ msg: 'Fetch all users' });
};

exports.getUser = async (req, res) => {
  const users = await fetchUsers();
  const currentUser = users.find((u) => u.id === req.params.id);

  if (!currentUser) {
    return res
      .status(400)
      .json({
        success: false,
        user: `No user with id ${req.params.id} in db.`,
      });
  }

  res.status(200).json({ success: true, user: currentUser.email });
};

exports.createUser = async (req, res) => {
  // TODO
  // If user doesn't exists in db, create user
  // Validate req.body with Joi.
  res.status(200).json({ msg: 'Create new user' });
};
