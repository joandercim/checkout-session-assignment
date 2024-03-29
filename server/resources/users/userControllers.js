const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const userSchema = require('../../models/userSchema');
const UserService = require('../../utils/UserService');
const User = require('../../models/User');

const fs = require('fs').promises;

exports.getUsers = async (req, res) => {
  // TODO: Should only work if admin?
  const users = await UserService.getAllUsers();

  res.status(200).json({ success: true, users });
};

exports.getUser = async (req, res) => {
  const currentUser = await UserService.getCurrentUserByID(req.params.id);

  if (!currentUser) {
    return res.status(400).json({
      success: false,
      user: `No user with id ${req.params.id} in db.`,
    });
  }

  res.status(200).json({ success: true, user: currentUser._id });
};

exports.createUser = async (req, res) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }

  const users = await UserService.getAllUsers();
  const currentUser = await UserService.getCurrentUserByEmail(req.body.email);

  if (currentUser) {
    return res.status(400).json({
      success: false,
      user: `User already in db.`,
    });
  }

  const hashedPass = await bcrypt.hash(req.body.password, 10);

  const newUser = new User(uuidv4(), req.body.email, hashedPass);

  users.push(newUser);

  await fs.writeFile('./data/users.json', JSON.stringify(users, null, 2));

  res.status(201).json({ success: true, user: newUser.email });
};
